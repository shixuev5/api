import { Service } from 'egg';

export default class UserService extends Service {
  search({ name, email }) {
    return this.app.model.User.find({
      $or: [{name: new RegExp(name)}, {email: new RegExp(email)}],
    });
  }
};
