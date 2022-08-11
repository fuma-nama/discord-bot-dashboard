import {dashboardData} from "./dashboard-data";
import {KillKane} from "./features/kill-kane";
import {BsPeopleFill} from "react-icons/bs";
import {DataTypes} from "../variables/type";

/**
 * @type ConfigType
 */
export const config = {
    name: "Dishub",
    footer: [
        {
            name: "Support",
            url: ""
        }
    ],
    features: {
        "auto_kill_kane": KillKane
    },
    data: {
        dashboard: dashboardData,
        features: data => [
            {
                name: "測試版功能",
                description: "在我們的不和諧服務器中投票，告訴我們您希望什麼功能",
                icon: BsPeopleFill,
                type: DataTypes.List,
                value: data.betaFeatures
            }
        ]
    },
}