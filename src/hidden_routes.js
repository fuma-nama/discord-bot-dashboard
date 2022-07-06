import Feature from "views/guild/feature";

/**
 * Routes that cannot access from sidebar
 * You are able to use url variables
 */
const routes = [
  {
    name: "功能配置面板",
    path: "/feature/:feature",
    component: Feature,
  },
];

export default routes;
