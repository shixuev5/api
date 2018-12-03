export default {
  role: {
    owner: '拥有者',
    devloper: '开发者',
    visitor: '访客'
  },
  project: {
    private: {
      title: '私有 - 项目访问权限必须明确授权给每个用户。',
      icon: 'lock'
    },
    shared: {
      title: '私有 - 项目访问权限必须明确授权给每个用户。',
      icon: 'share-alt'
    },
    public: {
      title: '私有 - 项目访问权限必须明确授权给每个用户。',
      icon: 'unlock'
    },
  },
  group: {
    private: {
      title: '私有 - 群组访问权限必须明确授权给每个用户。',
      icon: 'lock'
    },
    shared: {
      title: '内部 - 该群组允许已登录的用户访问。',
      icon: 'share-alt'
    },
    public: {
      title: '公开 - 该群组允许任何人访问。',
      icon: 'unlock'
    },
  }
}