export default {
  success({ ctx, data, code = 0, msg = '成功'}) {
    ctx.body = {
      code,
      data,
      msg,
    };
    ctx.status = 200;
  },
};
