import fetch from "@/utils/fetch";

export default class Base {
  constructor(module) {
    this.fetch = fetch;
    this.module = module;
  }

  find(payload) {
    return this.fetch.get(this.module, {
      params: payload
    });
  }

  findById(id, payload = {}) {
    return this.fetch.get(`${this.module}/${id}`, {
      params: payload
    });
  }

  create(payload) {
    return this.fetch.post(this.module, payload);
  }

  update(id, payload) {
    return this.fetch.put(`${this.module}/${id}`, payload);
  }

  remove(id) {
    return this.fetch.delete(`${this.module}/${id}`);
  }
}
