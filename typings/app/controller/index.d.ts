// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Project from '../../../app/controller/projects';
import User from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    project: Project;
    user: User;
  }
}
