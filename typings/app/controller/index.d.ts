// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Project from '../../../app/controller/project';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    project: Project;
    user: User;
  }
}
