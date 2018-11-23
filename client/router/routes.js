const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: "DefaultLayout",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { alias: "首页" },
        component: "project/Index"
      },
      {
        path: "projects/new",
        name: "projects_new",
        meta: { alias: "新建项目" },
        component: "project/Create"
      },
      {
        path: "projects",
        name: "projects",
        meta: { alias: "项目" },
        component: "project/List"
      },
      {
        path: "groups/new",
        name: "groups_new",
        meta: { alias: "新建群组" },
        component: "group/Create"
      },
      {
        path: "groups",
        name: "groups",
        meta: { alias: "群组" },
        component: "group/List"
      }
    ]
  },
  {
    path: "/user/login",
    name: "login",
    meta: { auth: false },
    component: "user/Login"
  },
  {
    path: "/explore",
    name: "explore",
    meta: { auth: false, alias: "探索" },
    component: "explore/Index",
    children: [
      {
        path: "projects",
        name: "explore_projects",
        meta: { alias: "项目" },
        component: "project/List"
      },
      {
        path: "groups",
        name: "explore_groups",
        meta: { alias: "群组" },
        component: "group/List"
      }
    ]
  },
  {
    path: "/postman",
    name: "postman",
    meta: { alias: "Postman" },
    component: "postman/Index"
  }
];

export default routes;
