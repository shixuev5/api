const routes = [
  {
    path: "/",
    redirect: { name: "dashboard" },
    component: "DefaultLayout",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        layout: "NavLayout",
        meta: { alias: "首页" },
        component: "common/Dashboard"
      },

      /* 项目 */
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
        path: "projects/:id",
        name: "project",
        config: "project.menu",
        component: "AsideLayout",
        redirect: { name: "project_modules" },
        children: [
          {
            path: "modules",
            name: "project_modules",
            component: "module/List",
            // children: [
            //   {
            //     path: ":id",
            //     name: "module_interfaces",
            //     component: "interface/List"
            //   }
            // ]
          },
          {
            path: "test",
            name: "project_test",
            component: "test/Index"
          },
          {
            path: "model",
            name: "project_model",
            component: "project/Model"
          },
          {
            path: "template",
            name: "project_template",
            component: "project/Template"
          },
          {
            path: "mock",
            name: "project_mock",
            component: "mock/Index"
          },
          {
            path: "activity",
            name: "project_activity",
            component: "project/Activity"
          },
          {
            path: "import",
            name: "project_import",
            component: "project/Import"
          },
          {
            path: "member",
            name: "project_member",
            component: "project/Member"
          },
          {
            path: "wiki",
            name: "project_wiki",
            component: "project/Wiki"
          },
          {
            path: "setting",
            name: "project_setting",
            component: "project/Setting"
          }
        ]
      },

      /* 群组 */
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
        path: "groups/:id",
        name: "group",
        config: "group.menu",
        component: "AsideLayout",
        redirect: { name: "group_index" },
        children: [
          {
            path: "",
            name: "group_index",
            component: "group/Index"
          },
          {
            path: "activity",
            name: "group_activity",
            component: "group/Activity"
          },
          {
            path: "member",
            name: "group_member",
            component: "group/Member"
          },
          {
            path: "wiki",
            name: "group_wiki",
            component: "group/Wiki"
          },
          {
            path: "setting",
            name: "group_setting",
            component: "group/Setting"
          }
        ]
      },

      /* Postman */
      {
        path: "postman",
        name: "postman",
        meta: { alias: "Postman" },
        component: "postman/Index"
      },

      /* 探索 */
      {
        path: "explore",
        name: "explore",
        meta: { auth: false, alias: "探索" },
        redirect: { name: "explore_projects" },
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
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    layout: "LoginLayout",
    meta: { auth: false },
    component: "common/Login"
  },
  {
    path: "/signup",
    name: "signup",
    layout: "LoginLayout",
    meta: { auth: false },
    component: "common/Signup"
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: "common/Forbidden"
  },
  {
    path: "*",
    name: "not_found",
    meta: { auth: false },
    component: "common/NotFound"
  }
];

export default routes;
