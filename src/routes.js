import React from "react";

import {Icon} from "@chakra-ui/react";
import {RiFunctionFill} from "react-icons/ri";
import {BiServer} from "react-icons/bi";
import {MdFrontHand} from "react-icons/md";
import {IoIosArrowRoundBack, IoIosSettings} from "react-icons/io";
import {Navigate} from "react-router-dom";
// Admin Imports
import Dashboard from "views/guild/dashboard";
import Features from "views/guild/features";
import SettingsPanel from "./views/guild/settings";
import ActionsBoard from "./views/guild/action";
import {Locale} from "./utils/Language";

/**
 * Public Routes that can access on sidebar
 * Path variables are not allowed (ex: feature/:id)
 */
const routes = [
  {
    name: <Locale zh="返回個人資料面板" en="Back to Profile" />,
    path: "../",
    icon: <Icon as={IoIosArrowRoundBack} width="20px" height="20px" color="inherit" />,
    component: <Navigate replace to="/admin" />
  },
  {
    name: <Locale zh="服務器儀表板" en="Statistics" />,
    path: "dashboard",
    icon: <Icon as={BiServer} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
  },
  {
    name: <Locale zh="功能控制板" en="Features" />,
    path: "features",
    icon: (
      <Icon as={RiFunctionFill} width="20px" height="20px" color="inherit" />
    ),
    component: <Features />,
  },
  {
    name: <Locale zh="動作面板" en="Actions" />,
    path: "actions",
    icon: (
        <Icon as={MdFrontHand} width="20px" height="20px" color="inherit" />
    ),
    component: <ActionsBoard />,
  },
  {
    name: <Locale zh="服務器設置" en="Settings" />,
    path: "settings",
    icon: (
        <Icon as={IoIosSettings} width="20px" height="20px" color="inherit" />
    ),
    component: <SettingsPanel />,
  },
];

export default routes;
