import { Controller } from 'egg';

export default class UsersController extends Controller {
  /**
   * @method GET
   * @interface /api/v1/users/search
   * @description 查询用户名/邮箱是否注册
   * @param {String} [name] 用户名
   * @param {String} [email] 邮箱
   * @memberof UsersController
   */
  async search() {
    const { ctx, service } = this;
    const result = await service.user.search(ctx.query);
    if (result) {
      ctx.body = ctx.helper.res(result);
    } else {
      ctx.body = ctx.helper.res([], 404, 'Not Found!');
    }
  }

  /**
   * @method POST
   * @description 用户注册
   *
   * @memberof UsersController
   */
  async create() {}
  /**
   * @method POST
   * @interface /api/v1/users/login
   * @description 用户登陆
   * @param {String} name 用户名
   * @param {String} [email] 邮箱
   * @param {String} password 用户密码
   * @memberof UsersController
   */
  async login(ctx) {
    // const { name, email, password } = ctx.request.body;
    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        token: '123',
      },
    };
    ctx.status = 200;
  }

  async show() {
    this.ctx.body = {
      code: 0,
      message: 'success',
      data: {
        token: '123',
      },
    };
  }
  async update() {}
  async delete() {}
}
