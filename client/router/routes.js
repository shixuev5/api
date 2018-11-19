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
        component: "project/Index",
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
        path: "postman",
        name: "postman",
        meta: { alias: "postman" },
        layout: "AsideLayout",
        component: "postman/Index"
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: { auth: false },
    component: "user/Login"
  }
];

export default routes;
