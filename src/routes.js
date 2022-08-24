import React from "react";

import {Icon} from "@chakra-ui/react";
import {RiFunctionFill} from "react-icons/ri";
import {BiServer} from "react-icons/bi";
import {MdFrontHand} from "react-icons/md";
import {IoIosSettings} from "react-icons/io";
// Admin Imports
import Dashboard from "views/guild/dashboard";
import Features from "views/guild/features";
import SettingsPanel from "./views/guild/settings";
import ActionsBoard from "./views/guild/action";
import Feature from "./views/guild/feature";
import ActionTasks from "./views/guild/action/action";
import TaskConfigBoard from "./views/guild/action/task";
import SubmitTaskBoard from "./views/guild/action/add";
import {FeaturesLayout} from "./layouts/guild/features";
import {ActionsLayout} from "./layouts/guild/actions";
import {config} from "./config/config";

/**
 * Public Routes that can access on sidebar
 * Path variables are not allowed (ex: feature/:id)
 */
const routes = [
    {
        name: {zh: "服務器儀表板", en: "Statistics"},
        icon: <Icon as={BiServer} width="20px" height="20px" color="inherit"/>,
        path: "dashboard",
        component: <Dashboard/>,
    },
    {
        name: {zh: "功能控制板", en: "Features"},
        icon: (
            <Icon as={RiFunctionFill} width="20px" height="20px" color="inherit"/>
        ),
        path: "features",
        component: <FeaturesLayout />,
        items: Object.entries(config.features).map(([id, feature]) => ({
            name: feature.name,
            path: id
        })),
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
        name: {zh: "動作面板", en: "Actions"},
        icon: (
            <Icon as={MdFrontHand} width="20px" height="20px" color="inherit"/>
        ),
        path: "actions",
        component: <ActionsLayout />,
        items: Object.entries(config.actions).map(([id, action]) => ({
            name: action.name,
            path: id
        })),
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
        name: {zh: "服務器設置", en: "Settings"},
        icon: (
            <Icon as={IoIosSettings} width="20px" height="20px" color="inherit"/>
        ),
        path: "settings",
        component: <SettingsPanel/>
    },
];

export default routes;
