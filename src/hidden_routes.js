import Feature from "views/guild/feature";
import ActionTasks from "./views/guild/action/config";

/**
 * Routes that cannot access from sidebar
 * You are able to use url variables
 */
const routes = [
  {
    path: "feature/:feature",
    component: <Feature />,
  },
  {
    path: "action/:action",
    component: <ActionTasks />
  }
];

export default routes;
