import Base from "./base";

class User extends Base {
  constructor() {
    super("users");
  }
  exist(payload) {
    return this.fetch.get(`${this.module}/exsit`, {
      params: payload
    });
  }
  login(payload) {
    return this.fetch.put(this.module, payload);
  }
}

export default new User();
