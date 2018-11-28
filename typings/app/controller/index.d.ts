// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Projects from '../../../app/controller/projects';
import Users from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    projects: Projects;
    users: Users;
  }
}
