import React from "react";

import { Icon } from "@chakra-ui/react";
import { RiFunctionFill } from "react-icons/ri";
import { BiServer } from "react-icons/bi";
import {IoIosSettings} from "react-icons/io";

// Admin Imports
import Dashboard from "views/guild/dashboard";
import Features from "views/guild/features";
import SettingsPanel from "./views/guild/settings";

/**
 * Public Routes that can access on sidebar
 * Path variables are not allowed (ex: feature/:id)
 */
const routes = [
  {
    name: "服務器儀表板",
    path: "dashboard",
    icon: <Icon as={BiServer} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
  },
  {
    name: "功能控制板",
    path: "features",
    icon: (
      <Icon as={RiFunctionFill} width="20px" height="20px" color="inherit" />
    ),
    component: <Features />,
    secondary: true,
  },
  {
    name: "服務器設置",
    path: "settings",
    icon: (
        <Icon as={IoIosSettings} width="20px" height="20px" color="inherit" />
    ),
    component: <SettingsPanel />,
    secondary: true
  }
];

export default routes;
