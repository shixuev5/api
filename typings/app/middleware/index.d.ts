// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import ErrorHandler from '../../../app/middleware/error_handler';
import Log from '../../../app/middleware/log';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ErrorHandler;
    log: typeof Log;
  }
}
