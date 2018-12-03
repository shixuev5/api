import Base from "./base";

class User extends Base {
  constructor() {
    super("users");
  }
  count(payload) {
    return this.fetch.get(`${this.module}/count`, {
      params: payload
    });
  }
  login(payload) {
    return this.fetch.put(this.module, payload);
  }
}

export default new User();
