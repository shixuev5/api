// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGroups from '../../../app/controller/groups';
import ExportInterfaces from '../../../app/controller/interfaces';
import ExportModules from '../../../app/controller/modules';
import ExportProjects from '../../../app/controller/projects';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    groups: ExportGroups;
    interfaces: ExportInterfaces;
    modules: ExportModules;
    projects: ExportProjects;
    users: ExportUsers;
  }
}
