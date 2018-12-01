// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/service/base';
import ExportProject from '../../../app/service/project';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    base: ExportBase;
    project: ExportProject;
    user: ExportUser;
  }
}
