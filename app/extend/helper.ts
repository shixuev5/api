import { IHelper } from 'egg';

export default {
  res(this: IHelper, data: any, code = 0, message = '成功') {
    return {
      data,
      code,
      message,
    };
  },
};
