import Base from "./base";

class User extends Base {
  constructor() {
    super("users");
  }
  check(payload) {
    return this.fetch.get(`${this.module}/check`, {
      params: payload
    });
  }
  login(payload) {
    return this.fetch.post(`${this.module}/session`, payload);
  }
}

export default new User();
