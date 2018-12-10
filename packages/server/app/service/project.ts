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
  /* 添加项目成员 */
  createMember(_id, payload) {
    return this.db.update({ _id }, {
      $push: {
        members: payload,
      },
    });
  }
  /* 更新项目成员角色 */
  async updateMember(_id, memberId, payload) {
    this.checkPermission(this.getCurrentRole(_id), payload.role);
    return this.db.update({
      _id,
      'members._id': memberId,
    }, {
      $set: {
        'members.$.role': payload.role,
      },
    });
  }
  /* 删除项目成员 */
  async removeMember(_id, memberId) {
    const group = await this.db.findOne({
      _id,
      'members._id': memberId,
    });
    this.checkPermission(this.getCurrentRole(_id), group.members[0].role);
    return this.db.update({ _id }, {
      $pull: {
        members: {
          _id: memberId,
        },
      },
    });
  }
  /* 创建项目 */
  create(payload) {
    return this.db.create({
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
      ...payload,
    });
  }
  /* 获取当前用户的项目成员角色 */
  async getCurrentRole(_id) {
    const project = await this.db.findOne({
      _id,
      'members._id': this.ctx.state.user._id,
    });
    if (project) {
      return project.members[0].role;
    }
    const group = await this.db.findOne({
      _id: project.group_id,
      'members._id': this.ctx.state.user._id,
    });
    return group.members[0].role;
  }
  /* 操作权限检查 */
  checkPermission(currentRole, updateRole) {
    const mapping = {
      owner: 2,
      devloper: 1,
      visitor: 0,
    };
    const difference = mapping[currentRole] - mapping[updateRole];
    if (!mapping[currentRole] || difference < 0) {
      this.ctx.throw('您没有权限进行此项操作!');
    }
  }
}
