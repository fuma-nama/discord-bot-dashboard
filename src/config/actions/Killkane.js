import {Locale} from "utils/Language";

export const KillKaneAction = {
    name: {
        zh: "自動殺死凱恩",
        en: "Auto Kill Kane"
    },
    description: <Locale zh="凱恩加入服務器時自動殺死凱恩" en="Kill Kane when he joined the server" />,
    options: (values) => [
        {
            id: "channel",
            name: "Channel",
            description: "The Channel to kill Kane",
            type: "number",
            value: values? values.channel : "",
        },
    ]
}