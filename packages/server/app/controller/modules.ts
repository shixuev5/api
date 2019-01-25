import { Controller } from "egg";

export default class ModulesController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Module.find(ctx.query);
    ctx.helper.success(res);
  }
  /* 模块名称检查 */
  async check() {}
  async create() {
    const { ctx } = this;
    const res = await ctx.model.Module.create(ctx.request.body);
    ctx.helper.success(res);
  }
  async show() {
    const { ctx } = this;
    const res = await ctx.model.Module.findById(ctx.params.id);
    ctx.helper.success(res);
  }
  async update() {
    const { ctx } = this;
    await ctx.model.Module.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  async remove() {
    const { ctx } = this;
    const { _id } = await ctx.model.Module.findByIdAndRemove(ctx.params.id);
    ctx.helper.success({ _id });
  }
}
