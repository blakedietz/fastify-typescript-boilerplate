import path from 'path';
import AutoLoad from 'fastify-autoload';
import fastifyCors from 'fastify-cors';

export default function(fastify, opts, next) {
  fastify.register(fastifyCors, {
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
    includeTypeScript: true,
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts),
    includeTypeScript: true,
  });

  // Make sure to call next when done
  next();
}
