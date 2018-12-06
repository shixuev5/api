import { Controller } from 'egg';

export default class ProjectsController extends Controller {
   /* 根据 type 显示分类列表 */
  async index() {
    const { ctx, service } = this;
    const { type, ...args } = ctx.query;
    const projects = await service.project[type ? type : 'find'](args);
    const res = await service.project.countInterface(projects);
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
  async createMember() {

  }
  async updateMember() {

  }
  async removeMember() {

  }
  async createEnv() {

  }
  async updateEnv() {

  }
  async removeEnv() {

  }
}
