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
  /* 创建群组 */
  create(payload) {
    return super.create({
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
      ...payload,
    });
  }
};
