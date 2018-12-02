import { Controller } from 'egg';

export default class ProjectsController extends Controller {
  async index() {
    const { ctx, service } = this;
    const res = await service.project.find(ctx.query);
    ctx.helper.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const res = await service.project.create(ctx.request.body);
    ctx.helper.success(res);
  }
  async show() {
    const { ctx, service } = this;
    const res = await service.project
      .findById(ctx.params.id);
    ctx.helper.success(res);
  }
  async update() {
    const { ctx, service } = this;
    await service.project.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  async remove() {
    const { ctx, service } = this;
    const { _id } = await service.project.remove(ctx.params.id);
    ctx.helper.success({ _id });
  }
}
