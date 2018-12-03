import _ from 'lodash';
import BaseService from './base';

export default class ProjectService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Project');
  }
  /* 我的项目 */
  async owner() {
    const groupIds = await this.service.group.owner().select('_id');
    return _.unionBy(await this.db.find({
      group_id: {
        $in: groupIds,
      },
    }), await this.db.find({
      'members._id': this.ctx.state.user._id,
    }), '_id');
  }
  /* 关注项目 */
  async star() {
    const projectIds = await this.service.star.find({
      user_id: this.ctx.state.user._id,
    });
    return this.db.find({
      _id: {
        $in: projectIds,
      },
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
