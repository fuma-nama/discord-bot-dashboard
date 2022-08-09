import {
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import {OptionField, OptionHandlerContext} from "../OptionPanel";
import {HSeparator} from "../../separator/Separator";
import {InputField} from "../impl/InputField";

const DefaultEmbed = {
    title: "",
    description: "",
    url: "",
    color: "",
    thumbnail: "",
    author: {
        name: "",
        link: "",
        icon: ""
    },
    footer: "",
    fields: []
}

const DefaultMessage = ""

const handler = {
    "_embed_field": (props) => <EmbedField {...props} />
}

export default function MessageBuildCard({value, onChange}) {
    const get = (name) => {
        return value != null && value[name]
    }

    const data = {
        type: get("type") || "message",
        message: get("message") || DefaultMessage,
        embed: get("embed") || DefaultEmbed
    }

    return <Tabs defaultIndex={data.type === "message" ? 0 : 1}>
        <TabList>
            <Tab>信息</Tab>
            <Tab>嵌入</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <MessagePanel data={data} onChange={onChange}/>
            </TabPanel>
            <TabPanel>
                <EmbedPanel data={data} onChange={onChange}/>
            </TabPanel>
        </TabPanels>
    </Tabs>
}

function MessagePanel({data, onChange}) {
    const onType = (v) => {
        onChange({
            ...data,
            message: v
        });
    }

    return <FormControl>
        <FormLabel htmlFor='content'>內容</FormLabel>
        <InputField
            id='content'
            variant="main"
            placeholder="YEEE"
            value={data.message}
            onChange={event => onType(event.target.value)}
        />
        <FormHelperText>內容不能為空</FormHelperText>
    </FormControl>
}

function EmbedPanel({data, onChange}) {
    const embed = data.embed

    const update = (name, v) => {
        onChange({
            ...data,
            embed: {
                ...embed,
                [name]: v
            }
        });
    }

    const updateAuthor = (name, v) => {
        update("author", {
            ...embed.author,
            [name]: v
        })
    }

    const info = {
        name: "基本設置",
        fields: [
            {
                name: "標題",
                id: "title",
                type: "string",
            },
            {
                name: "描述",
                id: "detail",
                type: "long_string"
            },
            {
                name: "網址",
                id: "url",
                type: "string"
            },
            {
                name: "頁腳",
                id: "footer",
                type: "string"
            },
            {
                name: "顏色",
                id: "color",
                type: "color"
            }
        ],
        mapper(field) {
            return <Field
                head
                key={field.id}
                option={field}
                value={embed[field.id]}
                onChange={v => update(field.id, v)}
            />
        }
    }

    const advanced = {
        name: "高級設置",
        fields: [
            {
                name: "信息字段",
                id: "fields",
                type: "array",
                element: {
                    type: "_embed_field",
                    holder: {
                        name: "",
                        value: "",
                        inline: false
                    }
                }
            }
        ],
        mapper(field) {
            return <Field
                head
                key={field.id}
                option={field}
                value={embed[field.id]}
                onChange={v => update(field.id, v)}
            />
        }
    }

    const author = {
        name: "作者設置",
        fields: [
            {
                id: "name",
                name: "姓名",
                type: "string"
            },
            {
                id: "link",
                name: "網址鏈接",
                type: "string"
            },
            {
                id: "icon",
                name: "頭像",
                type: "string"
            }
        ],
        mapper(field) {
            return <Field
                head
                key={field.id}
                option={field}
                value={embed.author[field.id]}
                onChange={v => updateAuthor(field.id, v)}
            />
        }
    }

    return <FormControl>
        <OptionHandlerContext.Provider value={handler}>
            <Category {...info} isFirst/>
            <Category {...author} />
            <Category {...advanced} />
        </OptionHandlerContext.Provider>
    </FormControl>
}

function Category({isFirst, name, fields, mapper}) {
    return <Stack>
        {!isFirst && <HSeparator my="5"/>}
        <Text fontSize="2xl" fontWeight="bold" my="4">{name}</Text>
        <Stack gap={3}>
            {fields.map(mapper)}
        </Stack>
    </Stack>
}

function Field({option, value, onChange, head}) {
    return <>
        <Text wordBreak="keep-all" fontSize={head && "xl"} fontWeight={head && "bold"}>{option.name}</Text>
        <OptionField value={value} onChange={onChange} option={option}/>
    </>
}

function EmbedField({value, onChange}) {
    const change = (name, v) => {
        onChange({
            ...value,
            [name]: v
        })
    }

    return <Stack w="full" direction={{base: "column", md: "row"}} alignItems={{md: "baseline"}}>
        <Field option={{
            name: "名稱",
            type: "string"
        }}
               value={value.name}
               onChange={v => change("name", v)}
        />
        <Field option={{
            name: "數值",
            type: "string"
        }}
               value={value.value}
               onChange={v => change("value", v)}
        />
        <HStack w="full" direction="row-reverse" alignItems="baseline">
            <Field option={{
                name: "水平",
                type: "boolean"
            }}
                   value={value.inline}
                   onChange={v => change("inline", v)}
            />
        </HStack>
    </Stack>
}