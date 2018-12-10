import BaseService from './base';

export default class GroupService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Group');
  }
  /* 创建群组 */
  create(args) {
    return this.db.create({
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
      ...args,
    });
  }
  /* 我的群组 */
  owner(args: object) {
    return this.db.find({
      'members._id': this.ctx.state.user._id,
      ...args,
    });
  }
  /* 探索群组 */
  explore(args: object) {
    return this.db.find({
      permission: {
        $in: ['shared', 'public'],
      },
      ...args,
    });
  }
  /* 统计群组包含的项目数 */
  async countProject(groups) {
    const counts = await Promise.all(
      groups.map((group) =>
        this.service.project.count({
          group_id: group._id,
        }),
      ),
    );
    return groups.map((group, index) =>
      Object.assign({ project_num: counts[index] }, group.toJSON()),
    );
  }
  /* 获取可添加用户列表 */
  async groupUsers(_id, { q, limit = 10 }) {
    const { members } = await this.db.findOne({ _id });
    return this.app.model.User.find({
      _id: {
        $nin: members.map((item) => item._id),
      },
      name: { $regex: new RegExp(q, 'i') },
    }).limit(limit).select('-password -salt');
  }
  /* 添加群组成员 */
  createMember(_id: string, payload: Array<object>) {
    return this.db.update(
      { _id },
      {
        $push: {
          members: {
            $each: payload,
          },
        },
      },
    );
  }
  /* 更新群组成员角色 */
  updateMember(_id, memberId, { role }) {
    return this.db.update(
      {
        _id,
        'members._id': memberId,
      },
      {
        $set: {
          'members.$.role': role,
        },
      },
    );
  }
  /* 删除群组成员 */
  removeMember(_id, memberId) {
    return this.db.update(
      { _id },
      {
        $pull: {
          members: {
            _id: memberId,
          },
        },
      },
    );
  }
  /* 获取当前用户在当前群组的成员角色 */
  async getGroupRole(_id) {
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
      this.ctx.throw(403, '您没有权限进行此项操作!');
    }
  }
}
