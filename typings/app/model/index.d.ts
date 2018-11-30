// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Group from '../../../app/model/group';
import Interface from '../../../app/model/interface';
import Log from '../../../app/model/log';
import Module from '../../../app/model/module';
import Project from '../../../app/model/project';
import Star from '../../../app/model/star';
import User from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof Group>;
    Interface: ReturnType<typeof Interface>;
    Log: ReturnType<typeof Log>;
    Module: ReturnType<typeof Module>;
    Project: ReturnType<typeof Project>;
    Star: ReturnType<typeof Star>;
    User: ReturnType<typeof User>;
  }
}
