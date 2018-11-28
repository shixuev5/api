// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Base from '../../../app/service/base';
import Project from '../../../app/service/project';
import User from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    base: Base;
    project: Project;
    user: User;
  }
}
