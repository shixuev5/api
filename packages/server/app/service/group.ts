import BaseService from './base';

export default class GroupService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Group');
  }
  /* 我的群组 */
  owner(args) {
    return this.db.find({
      'members._id': this.ctx.state.user._id,
      ...args,
    });
  }
  /* 拥有操作权限的群组 */
  permission(args) {
    return this.db.find({
      'members._id': this.ctx.state.user._id,
      'members.role': {
        $in: ['owner', 'devloper'],
      },
      ...args,
    });
  }
  /* 探索群组 */
  explore(args) {
    return this.db.find({
      permission: {
        $in: ['shared', 'public'],
      },
      ...args,
    });
  }
  /* 统计群组包含的项目数 */
  async countProject(groups) {
    const counts = await Promise.all(groups.map((group) => this.service.project.count({
      group_id: group._id,
    })));
    return groups.map((group, index) => Object.assign({ project_num: counts[index]}, group.toJSON()));
  }
  /* 添加群组成员 */
  createMember(_id, payload) {
    return this.db.update({ _id }, {
      $push: {
        members: payload,
      },
    });
  }
  /* 更新群组成员角色 */
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
  /* 删除群组成员 */
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

  /* 创建群组 */
  create(payload) {
    return this.db.create({
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
      ...payload,
    });
  }
  /* 获取当前用户的群组成员角色 */
  async getCurrentRole(_id) {
    const group = await this.db.findOne({
      _id,
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
};
