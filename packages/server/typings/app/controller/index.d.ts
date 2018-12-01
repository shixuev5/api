// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProjects from '../../../app/controller/projects';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    projects: ExportProjects;
    users: ExportUsers;
  }
}
