# Fastify typescript boilerplate

## How to use

### Dependencies

#### Docker

You will need to make sure you have docker installed. This is used for easy dev with postgres.

#### Docker compose

You'll also need to have `docker-compose` installed.

#### nvm

A `.nvmrc` is used to specify the current version of node that is expected.

Install it and run:

```bash
npm i;
npm run dev-setup:init;
npm run dev;
```

## The idea behind the boilerplate 

This project sets you up with a secure and fully functional backend web app and api boilerplate that is ready for deployment
to heroku. The app has the following features:

- Typescript support
- Light dependency injection container through TypeDI
- ORM support through TypeORM with Postgres
- User management
    - Create account
    - Sign in
    - Sign out
- AuthO and AuthZ
- Dockerized development environment: Easily tear down and spin up production-like environments locally
- Simplified development environment variable management via `env:*` scripts
- GraphQL support

