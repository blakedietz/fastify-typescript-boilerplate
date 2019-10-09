import 'reflect-metadata';
import { validateEnvironment } from './validate-environment';
import dotenv from 'dotenv';
dotenv.config();
validateEnvironment(process.env);
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import fastify from 'fastify';
import app from './app';
import assert from 'assert';
import { server as graphqlServer } from './graphql/server';

const server = fastify({
  logger: true,
});

useContainer(Container);
const start = async () => {
  let databaseConnection;
  try {
    assert(
      process.env.DATABASE_URL &&
        process.env.DATABASE_URL.includes('postgres://'),
      'A proper DATABASE_URL was not specified in the environment.',
    );
    server.register(graphqlServer.createHandler());

    databaseConnection = await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: ['src/entity/**/*.ts'],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    });

    server.register(app);
    await server.listen(
      process.env.PORT ? Number(process.env.PORT) : 3001,
      '0.0.0.0',
    );
  } catch (err) {
    if (databaseConnection) {
      databaseConnection.close();
    }
    server.log.error(err);
    process.exit(1);
  }
};

start();
