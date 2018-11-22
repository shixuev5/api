const routes = [
  {
    path: "/",
    name: "dashboard",
    meta: { alias: "首页" },
    component: "DefaultLayout",
    redirect: "projects",
    children: [
      {
        path: "projects",
        name: "projects",
        meta: { alias: "项目" },
        layout: "NavLayout",
        component: "project/Index"
      },
      {
        path: "projects/new",
        name: "projects_new",
        meta: { alias: "新建项目" },
        layout: "NavLayout",
        component: "project/Create"
      },
      {
        path: "groups",
        name: "groups",
        meta: { alias: "群组" },
        layout: "NavLayout",
        component: "group/Index"
      },
      {
        path: "groups/new",
        name: "groups_new",
        meta: { alias: "新建群组" },
        layout: "NavLayout",
        component: "group/Create"
      },
      {
        path: "postman",
        name: "postman",
        meta: { alias: "Postman" },
        component: "postman/Index"
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { auth: false },
    component: "login/Index"
  },
  {
    path: "/explore",
    name: "explore",
    layout: ["DefaultLayout", "NavLayout"],
    meta: { auth: false, alias: "探索" },
    redirect: "/explore/project",
    component: "explore/Index",
    children: [
      {
        path: "project",
        name: "project",
        meta: { alias: "项目" },
        component: "explore/Project"
      },
      {
        path: "group",
        name: "group",
        meta: { alias: "群组" },
        component: "explore/Group"
      }
    ]
  }
];

export default routes;
