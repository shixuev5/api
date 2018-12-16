import BaseService from './base';

export default class ProjectService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Project');
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
  /* 获取可添加的用户列表 */
  async projectUsers(_id, { q, limit = 10 }) {
    // 通过项目查找群组id
    const project = await this.db.findOne({ _id });
    const group = await this.app.model.Group.findOne({ _id: project.group_id });

    const memberIds = group.members
      .map((item) => item._id)
      .concat(project.members.map((item) => item._id));

    return this.app.model.User.find({
      _id: {
        $nin: memberIds,
      },
      name: { $regex: new RegExp(q, 'i') },
    }).limit(limit).select('-password -salt');
  }
  /* 添加项目成员 */
  createMember(_id: string, payload: Array<object>) {
    return this.db.update({ _id }, {
      $push: {
        members: {
          $each: payload,
        },
      },
    });
  }
  /* 更新项目成员角色 */
  updateMember(_id, memberId, { role }) {
    return this.db.update({
      _id,
      'members._id': memberId,
    }, {
      $set: {
        'members.$.role': role,
      },
    });
  }
  /* 删除项目成员 */
  removeMember(_id, memberId) {
    return this.db.update({ _id }, {
      $pull: {
        members: {
          _id: memberId,
        },
      },
    });
  }
  /* 获取当前用户的项目成员角色 */
  async getProjectRole(_id) {
    const project = await this.db.findOne({ _id });
    const member = project.members.find((item) => item._id === this.ctx.state.user._id);
    return member ? member.role : this.service.group.getGroupRole(project.group_id);
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
  /* 关注项目 */
  async starProject(_id, userId) {
    if (!userId) {
      this.ctx.throw('用户id为空！');
    }
    const project = this.db.find({_id, 'stars._id': userId });
    if(project) {
      this.ctx.throw('您已关注此项目！');
    }
    return this.db.findByIdAndUpdate(_id, {
      $push: {
        stars: { _id: userId },
      },
    });
  }
  /* 取消关注 */
  unStarProject(_id, userId) {
    if (!userId) {
      this.ctx.throw('用户id为空！');
    }
    const project = this.db.find({_id, 'stars._id': userId });
    if (!project) {
      this.ctx.throw('您还未关注此项目！');
    }
    return this.db.findByIdAndUpdate(_id, {
      $pull: {
        stars: { _id: userId },
      },
    });
  }
}
