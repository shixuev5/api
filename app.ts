import { Application } from 'egg';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

export default (app: Application) => {
  app.once('server', (server) => {
    SubscriptionServer.create(
      {
        // schema: app.schema,
        execute,
        subscribe,
      },
      {
        server,
        path: app.config.graphql.subscribe,
      },
    );
  });
};
