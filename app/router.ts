import { Application } from 'egg';
import { createRoute } from './utils/index';

const routes = {
  user: [
    {
      path: 'search',
      method: 'get',
      action: 'search',
    },
    {
      path: 'signup',
      method: 'post',
      action: 'signup',
    },
    {
      path: 'login',
      method: 'post',
      action: 'login',
    },
  ],
};

export default (app: Application) => {
  // socket.io
  // io.of('/').route('server', io.controller.default.ping);

  createRoute(app.router, 'api/v1', routes);
};
