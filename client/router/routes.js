const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: "DefaultLayout",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        layout: "NavLayout",
        meta: { alias: "首页" },
        component: "project/Index"
      },
      {
        path: "projects/new",
        name: "projects_new",
        layout: "NavLayout",
        meta: { alias: "新建项目" },
        component: "project/Create"
      },
      {
        path: "projects",
        name: "projects",
        layout: "NavLayout",
        meta: { alias: "项目" },
        component: "project/List"
      },
      {
        path: "groups/new",
        name: "groups_new",
        layout: "NavLayout",
        meta: { alias: "新建群组" },
        component: "group/Create"
      },
      {
        path: "groups",
        name: "groups",
        layout: "NavLayout",
        meta: { alias: "群组" },
        component: "group/List"
      },
      {
        path: "interfaces/new",
        name: "interfaces_new",
        meta: { alias: "新建接口" },
        component: "interface/Create"
      },
      {
        path: "interfaces",
        name: "interfaces",
        meta: { alias: "接口" },
        component: "interface/List"
      },
      {
        path: "postman",
        name: "postman",
        meta: { alias: "Postman" },
        component: "postman/Index"
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { auth: false },
    component: "user/Login"
  },
  {
    path: "/explore",
    name: "explore",
    meta: { auth: false, alias: "探索" },
    redirect: "/explore/projects",
    component: "explore/Index",
    children: [
      {
        path: "projects",
        name: "explore_projects",
        meta: { alias: "项目" },
        component: "explore/Project"
      },
      {
        path: "groups",
        name: "explore_groups",
        meta: { alias: "群组" },
        component: "explore/Group"
      }
    ]
  },
];

export default routes;
