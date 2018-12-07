import { Application } from 'egg';
import { createRoute } from './utils/index';

const routes = {
  users: [
    {
      path: '',
      method: 'get',
      action: 'index',
    },
    {
      path: '',
      method: 'post',
      action: 'create',
    },
    {
      path: 'check',
      method: 'get',
      action: 'check',
    },
    {
      path: 'session',
      method: 'post',
      action: 'createToken',
    },
    {
      path: ':id',
      method: 'get',
      action: 'show',
    },
    {
      path: ':id',
      method: 'put',
      action: 'update',
    },
    {
      path: ':id',
      method: 'delete',
      action: 'remove',
    },
  ],
  groups: [
    {
      path: '',
      method: 'get',
      action: 'index',
    },
    {
      path: '',
      method: 'post',
      action: 'create',
    },
    {
      path: 'members',
      method: 'post',
      action: 'createMember',
    },
    {
      path: 'members',
      method: 'put',
      action: 'updateMember',
    },
    {
      path: 'members',
      method: 'delete',
      action: 'removeMember',
    },
    {
      path: ':id',
      method: 'get',
      action: 'show',
    },
    {
      path: ':id',
      method: 'put',
      action: 'update',
    },
    {
      path: ':id',
      method: 'delete',
      action: 'remove',
    },
  ],
  projects: [
    {
      path: '',
      method: 'get',
      action: 'index',
    },
    {
      path: '',
      method: 'post',
      action: 'create',
    },
    {
      path: 'envs',
      method: 'post',
      action: 'createEnv',
    },
    {
      path: 'envs',
      method: 'put',
      action: 'updateEnv',
    },
    {
      path: 'envs',
      method: 'delete',
      action: 'removeEnv',
    },
    {
      path: 'members',
      method: 'post',
      action: 'createMember',
    },
    {
      path: 'members',
      method: 'put',
      action: 'updateMember',
    },
    {
      path: 'members',
      method: 'delete',
      action: 'removeMember',
    },
    {
      path: ':id',
      method: 'get',
      action: 'show',
    },
    {
      path: ':id',
      method: 'put',
      action: 'update',
    },
    {
      path: ':id',
      method: 'delete',
      action: 'remove',
    },
  ],
  modules: [
    {
      path: '',
      method: 'get',
      action: 'index',
    },
    {
      path: '',
      method: 'post',
      action: 'create',
    },
    {
      path: ':id',
      method: 'get',
      action: 'show',
    },
    {
      path: ':id',
      method: 'put',
      action: 'update',
    },
    {
      path: ':id',
      method: 'delete',
      action: 'remove',
    },
  ],
  interfaces: [
    {
      path: '',
      method: 'get',
      action: 'index',
    },
    {
      path: '',
      method: 'post',
      action: 'create',
    },
    {
      path: ':id',
      method: 'get',
      action: 'show',
    },
    {
      path: ':id',
      method: 'put',
      action: 'update',
    },
    {
      path: ':id',
      method: 'delete',
      action: 'remove',
    },
  ],
};

export default (app: Application) => {
  // socket.io
  // io.of('/').route('server', io.controller.default.ping);

  createRoute(app.router, 'api/v1', routes);
};
