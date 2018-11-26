// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Group from '../../../app/model/group';
import Interface from '../../../app/model/interface';
import Module from '../../../app/model/module';
import Permission from '../../../app/model/permission';
import Project from '../../../app/model/project';
import User from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof Group>;
    Interface: ReturnType<typeof Interface>;
    Module: ReturnType<typeof Module>;
    Permission: ReturnType<typeof Permission>;
    Project: ReturnType<typeof Project>;
    User: ReturnType<typeof User>;
  }
}
