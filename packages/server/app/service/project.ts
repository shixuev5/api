import BaseService from './base';

export default class ProjectService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Project');
  }
  /* 我的项目 */
  async owner({ type }) {
    let personExtra = {};
    // type 为 person 个人时的额外查询条件
    if (type === 'person') {
      personExtra = { 'members.role': 'owner' };
    }

    const groupIds = await this.service.group.owner({
      ...personExtra,
    }).select('_id');

    // 查找从我的群组继承权限的项目
    const inheritProjects = await this.db.find({
      group_id: {
        $in: groupIds,
      },
    });

    const ownerProjects = await this.db.find({
      'members._id': this.ctx.state.user._id,
      ...personExtra,
    });

    return inheritProjects.concat(ownerProjects);
  }
  /* 关注项目 */
  star(args) {
    return this.db.find({
      'stars._id': this.ctx.state.user._id,
      ...args,
    });
  }
  /* 探索项目 */
  async explore({ type }) {
    const projects = await this.db.find({
      permission: {
        $in: ['shared', 'public'],
      },
    });

    // if (type === 'trend') {

    // }
    if (type === 'star') {
      projects.sort((a, b) => a.stars.length - b.stars.length);
    }

    return projects;
  }
  /* 查找项目包含的接口数 */
  async countInterface(projects) {
    const counts = await Promise.all(
      projects.map((project) =>
        this.service.interface.count({
          project_id: project._id,
        }),
      ),
    );
    return projects.map((project, index) =>
      Object.assign({ interface_num: counts[index] }, project.toJSON()),
    );
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
