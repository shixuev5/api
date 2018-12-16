import { Controller } from "egg";

export default class ProjectsController extends Controller {
  /* 根据 tab 显示分类列表 */
  async index() {
    const { ctx, service } = this;
    const { tab, ...args } = ctx.query;
    let projects;
    if (tab) {
      projects = await service.project[tab](args);
    } else {
      projects = await ctx.app.model.Project.find(args);
    }
    const res = await service.project.countInterface(projects);
    ctx.helper.success(res);
  }
  /* 项目名称检查 */
  async check() {
    const { ctx } = this;
    const project = await ctx.app.model.Project.findOne({
      name: ctx.query.name,
      group_id: ctx.query.group_id
    });
    ctx.helper.success(project && project._id);
  }
  async create() {
    const { ctx, service } = this;
    const res = await service.project.create(ctx.request.body);
    ctx.helper.success(res);
  }
  async show() {
    const { ctx } = this;
    const res = await ctx.model.Project.findById(ctx.params.id);
    ctx.helper.success(res);
  }
  async update() {
    const { ctx } = this;
    await ctx.model.Project.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  async remove() {
    const { ctx } = this;
    const { _id } = await ctx.model.Project.remove(ctx.params.id);
    ctx.helper.success({ _id });
  }
  /* 获取可添加的用户列表 */
  async projectUsers() {
    const { ctx, service } = this;
    const users = await service.project.projectUsers(ctx.params.id, ctx.query);
    ctx.helper.success(users);
  }
  /* 添加项目成员 */
  async createMember() {
    const { ctx, service } = this;
    const groupRole = await service.project.getProjectRole(ctx.params.id);
    if (!Array.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    ctx.request.body.forEach(item =>
      service.project.checkPermission(groupRole, item.role)
    );
    const res = await service.project.createMember(
      ctx.params.id,
      ctx.request.body
    );
    ctx.helper.success(res);
  }
  /* 更新项目成员 */
  async updateMember() {
    const { ctx, service } = this;
    service.project.checkPermission(
      await service.project.getProjectRole(ctx.params.id),
      ctx.request.body.role
    );
    await service.project.updateMember(
      ctx.params.id,
      ctx.params.member_id,
      ctx.request.body
    );
    ctx.helper.success(ctx.request.body);
  }
  /* 删除项目成员 */
  async removeMember() {
    const { ctx, service } = this;
    service.project.checkPermission(
      await service.project.getProjectRole(ctx.params.id),
      ctx.request.body.role,
    );
    const { _id } = await service.project.removeMember(
      ctx.params.id,
      ctx.params.member_id,
    );
    ctx.helper.success({ _id });
  }
  async createEnv() {}
  async updateEnv() {}
  async removeEnv() {}
  async projectStar() {
    const { ctx, service } = this;
    const res = await service.project.starProject(ctx.params.id, ctx.request.body.user_id);
    ctx.helper.success(res);
  }
  async projectUnStar() {
    const { ctx, service } = this;
    const res = await service.project.unStarProject(ctx.params.id, ctx.request.body.user_id);
    ctx.helper.success(res);
  }
}
