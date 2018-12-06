import Base from "./base";

class User extends Base {
  constructor() {
    super("users");
  }
  login(payload) {
    return this.fetch.post(`${this.module}/session`, payload);
  }
}

export default new User();
