import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import app from './app';
import assert from 'assert';

const server = fastify({
    logger: true,
});

const start = async () => {
    let databaseConnection;
    try {
        assert(
            process.env.DATABASE_URL &&
                process.env.DATABASE_URL.includes('postgres://'),
        );

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
            process.env.PORT ? Number(process.env.PORT) : 3000,
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
