import Feature from "views/guild/feature";
import ActionTasks from "./views/guild/action/config";
import SubmitTaskBoard from "./views/guild/action/add";
import TaskConfigBoard from "./views/guild/action/task";

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
  },
  {
    path: "action/:action/task/:task",
    component: <TaskConfigBoard />
  },
  {
    path: "action/:action/add",
    component: <SubmitTaskBoard />
  }
];

export default routes;
