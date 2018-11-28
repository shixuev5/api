import fetch from "@/utils/fetch";

export default class Base {
  constructor(module) {
    this.fetch = fetch;
    this.module = module;
  }

  paging(num = 0, size = 10, sort = { createdAt: 'desc' }) {
    return this.fetch.get(this.module, {
      params: {
        num,
        size,
        sort
      }
    });
  }

  find(payload) {
    return this.fetch.get(this.module, {
      params: payload
    });
  }

  findById(_id, payload = {}) {
    return this.fetch.get(`${this.module}/${_id}`, {
      params: payload
    });
  }

  create(payload) {
    return this.fetch.post(this.module, payload);
  }

  update(_id, payload) {
    return this.fetch.patch(`${this.module}/${_id}`, payload);
  }

  remove(_id) {
    return this.fetch.delete(`${this.module}/${_id}`);
  }
}