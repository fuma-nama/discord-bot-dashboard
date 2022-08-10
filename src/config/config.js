import {data} from "./data";
import {KillKane} from "./features/kill-kane";

export const config = {
    name: "Dishub",
    footer: [
        {
            name: "Support",
            url: ""
        }
    ],
    dashboard: {
        data
    },
    features: {
        "auto_kill_kane": KillKane,
        "auto_destroy_server": KillKane
    }
}