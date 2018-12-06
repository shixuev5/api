import { uniqBy } from 'lodash';
import BaseService from './base';

export default class ProjectService extends BaseService {
  constructor(ctx) {
    super(ctx, 'Project');
  }
  /* 我的项目 */
  async owner(args) {
    const groupIds = await this.service.group.owner(args).select('_id');
    // 查找从我的群组继承权限的项目
    const inheritProjects = await this.db.find({
      group_id: {
        $in: groupIds,
      },
      ...args,
    });
    // 查找项目成员中包含我的项目
    const ownerProjects = await this.db.find({
      'members._id': this.ctx.state.user._id,
    });
    // 对项目列表去重
    return uniqBy(inheritProjects.concat(ownerProjects), '_id');
  }
  /* 关注项目 */
  star(args) {
    return this.db.find({
      'stars._id': this.ctx.state.user._id,
      ...args,
    });
  }
  /* 探索项目 */
  explore(args) {
    return this.db.find({
      permission: {
        $in: ['shared', 'public'],
      },
      ...args,
    });
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
