import Fastify from 'fastify';
import fastifyOAS from 'fastify-oas';
import routes from './routes';
import { transactionSchema } from './schemas';

const fastify = Fastify({ logger: true });

fastify.register(fastifyOAS, {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'API documentation for transaction creation and webhook handling',
      version: '1.0.0',
    },
    consumes: ['application/json'],
    definitions: {
      transactions:{
        lasha: {type: "string"}
      }
    }, 
    components: {
      schemas: {
        TransactionSchema: transactionSchema,
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  exposeRoute: true,
});

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: '0.0.0.0', 
    });
    fastify.log.info(`Server listening at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
