import { IHelper } from 'egg';

export default {
  success(this: IHelper, data, code = 0, msg = '成功') {
    this.ctx.body = {
      code,
      data,
      msg,
    };
    this.ctx.status = 200;
  },
};
