declare module 'fastify-swagger' {
    import { FastifyPluginAsync } from 'fastify';
  
    interface SwaggerOptions {
      routePrefix?: string;
      swagger?: {
        info: {
          title: string;
          description: string;
          version: string;
        };
        tags?: Array<{ name: string; description: string }>;
        definitions?: any;
        [key: string]: any;
      };
      exposeRoute?: boolean;
    }
  
    const fastifySwagger: FastifyPluginAsync<SwaggerOptions>;
    export default fastifySwagger;
  }
  