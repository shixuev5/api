import { Controller } from "egg";

export default class InterfacesController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Interface.find(ctx.query);
    ctx.helper.success(res);
  }
  /* 接口名称检查 */
  async check() {}
  async create() {
    const { ctx } = this;
    const res = await ctx.model.Interface.create(ctx.request.body);
    ctx.helper.success(res);
  }
  async show() {
    const { ctx } = this;
    const res = await ctx.model.Interface.findById(ctx.params.id);
    ctx.helper.success(res);
  }
  async update() {
    const { ctx } = this;
    await ctx.model.Interface.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  async remove() {
    const { ctx } = this;
    const { _id } = await ctx.model.Interface.remove(ctx.params.id);
    ctx.helper.success({ _id });
  }
}
