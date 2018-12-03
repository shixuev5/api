// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGroup from '../../../app/model/group';
import ExportInterface from '../../../app/model/interface';
import ExportLog from '../../../app/model/log';
import ExportModule from '../../../app/model/module';
import ExportProject from '../../../app/model/project';
import ExportStar from '../../../app/model/star';
import ExportTemplate from '../../../app/model/template';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof ExportGroup>;
    Interface: ReturnType<typeof ExportInterface>;
    Log: ReturnType<typeof ExportLog>;
    Module: ReturnType<typeof ExportModule>;
    Project: ReturnType<typeof ExportProject>;
    Star: ReturnType<typeof ExportStar>;
    Template: ReturnType<typeof ExportTemplate>;
    User: ReturnType<typeof ExportUser>;
  }
}
