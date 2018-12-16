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
  updateMember(id, memberId, payload) {
    return this.fetch.put(`${this.module}/${id}/members/${memberId}`, payload);
  }
  deleteMember(id, memberId) {
    return this.fetch.delete(`${this.module}/${id}/members/${memberId}`);
  }
  star(id, payload) {
    return this.fetch.post(`${this.module}/${id}/star`, payload);
  }
  unStar(id, payload) {
    return this.fetch.delete(`${this.module}/${id}/star`, payload);
  }
}

export default new Project();
