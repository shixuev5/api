import BaseService from './base';

export default class GroupService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Group');
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
};
