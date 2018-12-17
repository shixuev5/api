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
      path: 'check',
      method: 'get',
      action: 'check',
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
    {
      path: ':id/users',
      method: 'get',
      action: 'groupUsers',
    },
    {
      path: ':id/members',
      method: 'post',
      action: 'createMember',
    },
    {
      path: ':id/members',
      method: 'put',
      action: 'updateMember',
    },
    {
      path: ':id/members',
      method: 'delete',
      action: 'removeMember',
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
      path: 'check',
      method: 'get',
      action: 'check',
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
    {
      path: ':id/envs',
      method: 'post',
      action: 'createEnv',
    },
    {
      path: ':id/envs',
      method: 'put',
      action: 'updateEnv',
    },
    {
      path: ':id/envs',
      method: 'delete',
      action: 'removeEnv',
    },
    {
      path: ':id/users',
      method: 'get',
      action: 'projectUsers',
    },
    {
      path: ':id/stars',
      method: 'post',
      action: 'projectStar',
    },
    {
      path: ':id/stars',
      method: 'delete',
      action: 'projectUnStar',
    },
    {
      path: ':id/members',
      method: 'post',
      action: 'createMember',
    },
    {
      path: ':id/members',
      method: 'put',
      action: 'updateMember',
    },
    {
      path: ':id/members',
      method: 'delete',
      action: 'removeMember',
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
      path: 'check',
      method: 'get',
      action: 'check',
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
      path: 'check',
      method: 'get',
      action: 'check',
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
