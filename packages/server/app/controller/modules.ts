import { Controller } from 'egg';

export default class ModulesController extends Controller {
  async index() {
    const { ctx, service } = this;
    const res = await service.module.find(ctx.query);
    ctx.helper.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const res = await service.module.create(ctx.request.body);
    ctx.helper.success(res);
  }
  async show() {
    const { ctx, service } = this;
    const res = await service.module
      .findById(ctx.params.id);
    ctx.helper.success(res);
  }
  async update() {
    const { ctx, service } = this;
    await service.module.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  async remove() {
    const { ctx, service } = this;
    const { _id } = await service.module.remove(ctx.params.id);
    ctx.helper.success({ _id });
  }
}