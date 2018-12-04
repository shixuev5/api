// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/service/base';
import ExportGroup from '../../../app/service/group';
import ExportInterface from '../../../app/service/interface';
import ExportModule from '../../../app/service/module';
import ExportProject from '../../../app/service/project';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    base: ExportBase;
    group: ExportGroup;
    interface: ExportInterface;
    module: ExportModule;
    project: ExportProject;
    user: ExportUser;
  }
}
