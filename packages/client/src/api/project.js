import Base from "./base";

class Project extends Base {
  constructor() {
    super("projects");
  }
  searchUsers(id, payload) {
    return this.fetch.get(`${this.module}/${id}/users`, {
      params: payload
    })
  }
  createMember(id, payload) {
    return this.fetch.post(`${this.module}/${id}/members`, payload);
  }
  updateMember(id, payload) {
    return this.fetch.put(`${this.module}/${id}/members`, payload);
  }
  deleteMember(id, payload) {
    return this.fetch.delete(`${this.module}/${id}/members`, {
      data: payload
    });
  }
  star(id, payload) {
    return this.fetch.post(`${this.module}/${id}/stars`, payload);
  }
  unStar(id, payload) {
    return this.fetch.delete(`${this.module}/${id}/stars`, {
      data: payload
    });
  }
}

export default new Project();
