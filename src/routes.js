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
import Feature from "./views/guild/feature";
import ActionTasks from "./views/guild/action/action";
import TaskConfigBoard from "./views/guild/action/task";
import SubmitTaskBoard from "./views/guild/action/add";
import {FeaturesLayout} from "./layouts/guild/features";
import {ActionsLayout} from "./layouts/guild/actions";

/**
 * Public Routes that can access on sidebar
 * Path variables are not allowed (ex: feature/:id)
 */
const routes = [
    {
        name: <Locale zh="返回個人資料面板" en="Back to Profile"/>,
        icon: <Icon as={IoIosArrowRoundBack} width="20px" height="20px" color="inherit"/>,
        path: "../",
        component: <Navigate replace to="/admin"/>
    },
    {
        name: <Locale zh="服務器儀表板" en="Statistics"/>,
        icon: <Icon as={BiServer} width="20px" height="20px" color="inherit"/>,
        path: "dashboard",
        component: <Dashboard/>,
    },
    {
        name: <Locale zh="功能控制板" en="Features"/>,
        icon: (
            <Icon as={RiFunctionFill} width="20px" height="20px" color="inherit"/>
        ),
        path: "features",
        component: <FeaturesLayout />,
        children: [
            {
                path: ":feature",
                component: <Feature />,
                hide: true
            },
            {
                path: "*",
                component: <Features/>,
                hide: true
            }
        ]
    },
    {
        name: <Locale zh="動作面板" en="Actions"/>,
        icon: (
            <Icon as={MdFrontHand} width="20px" height="20px" color="inherit"/>
        ),
        path: "actions",
        component: <ActionsLayout />,
        children: [
            {
                path: ":action",
                hide: true,
                children: [
                    {
                        path: "task/:task",
                        component: <TaskConfigBoard/>,
                    },
                    {
                        path: "add",
                        component: <SubmitTaskBoard/>,
                    },
                    {
                        path: "*",
                        component: <ActionTasks />,
                    }
                ]
            },
            {
                path: "*",
                component: <ActionsBoard/>,
            },
        ]
    },
    {
        name: <Locale zh="服務器設置" en="Settings"/>,
        icon: (
            <Icon as={IoIosSettings} width="20px" height="20px" color="inherit"/>
        ),
        path: "settings",
        component: <SettingsPanel/>
    },
];

export default routes;
