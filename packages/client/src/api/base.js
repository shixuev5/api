import fetch from "@/utils/fetch";

export default class Base {
  constructor(module) {
    this.fetch = fetch;
    this.module = module;
  }

  paging({ page = 0, per_page = 10, sort = 'createdAt', order = "desc", ...conditions }) {
    return this.fetch.get(this.module, {
      params: {
        page,
        per_page,
        sort,
        order,
        ...conditions,
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
