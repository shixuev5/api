import BaseService from './base';

export default class ProjectService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Project');
  }
  /* 我的项目 */
  async owner() {
    const groupIds = await this.service.group.owner().select('_id');
    // 查找从我的群组继承权限的项目
    const inheritProjects = await this.db.find({
      group_id: {
        $in: groupIds,
      },
    });
    // 查找项目成员中包含我的项目
    const ownerProjects = await this.db.find({
      'members._id': this.ctx.state.user._id,
    });
    // 对项目列表去重
    return inheritProjects.concat(ownerProjects);
  }
  /* 关注项目 */
  star() {
    return this.db.find({
      'stars._id': this.ctx.state.user._id,
    });
  }
  /* 探索项目 */
  explore() {
    return this.db.find({
      permission: {
        $in: ['shared', 'public'],
      },
    });
  }
  /* 查找项目包含的接口数 */
  async countInterface(projects) {
    const counts = await Promise.all(projects.map((project) => this.service.interface.count({
      interface_id: project._id,
    })));
    return projects.map((project, index) => Object.assign({ interface_num: counts[index]}, project.toJSON()));
  }
  /* 创建项目 */
  create(payload) {
    return super.create({
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
      ...payload,
    });
  }
}
