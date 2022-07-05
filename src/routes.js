import React from "react";

import { Icon } from "@chakra-ui/react";
import { RiFunctionFill } from "react-icons/ri";
import { BiServer } from "react-icons/bi";

// Admin Imports
import Dashboard from "views/guild/dashboard";
import Features from "views/guild/features";

const routes = [
  {
    name: "服務器儀表板",
    path: "/dashboard",
    icon: <Icon as={BiServer} width="20px" height="20px" color="inherit" />,
    component: Dashboard,
  },
  {
    name: "功能控制板",
    path: "/features",
    icon: (
      <Icon as={RiFunctionFill} width="20px" height="20px" color="inherit" />
    ),
    component: Features,
    secondary: true,
  },
];

export default routes;
