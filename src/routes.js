import React from "react";

import { Icon } from "@chakra-ui/react";
import { RiFunctionFill } from "react-icons/ri";
import { BiServer } from "react-icons/bi";
import {MdFrontHand} from "react-icons/md";
import { IoIosSettings, IoIosArrowRoundBack } from "react-icons/io";
import {Navigate} from "react-router-dom";
// Admin Imports
import Dashboard from "views/guild/dashboard";
import Features from "views/guild/features";
import SettingsPanel from "./views/guild/settings";
import ActionsBoard from "./views/guild/action";

/**
 * Public Routes that can access on sidebar
 * Path variables are not allowed (ex: feature/:id)
 */
const routes = [
  {
    name: "返回個人資料面板",
    path: "../",
    icon: <Icon as={IoIosArrowRoundBack} width="20px" height="20px" color="inherit" />,
    component: <Navigate replace to="/admin" />
  },
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
    name: "動作面板",
    path: "actions",
    icon: (
        <Icon as={MdFrontHand} width="20px" height="20px" color="inherit" />
    ),
    component: <ActionsBoard />,
    secondary: true
  },
  {
    name: "服務器設置",
    path: "settings",
    icon: (
        <Icon as={IoIosSettings} width="20px" height="20px" color="inherit" />
    ),
    component: <SettingsPanel />,
    secondary: true
  },
];

export default routes;
