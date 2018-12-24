// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportLog from '../../../app/middleware/log';
import ExportMock from '../../../app/middleware/mock';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    log: typeof ExportLog;
    mock: typeof ExportMock;
  }
}
