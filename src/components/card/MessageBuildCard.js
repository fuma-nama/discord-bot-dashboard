import {FormControl, FormHelperText, FormLabel, Input, Text} from "@chakra-ui/react";
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import {OptionField} from "../fields/OptionPanel";
import {HSeparator} from "../separator/Separator";

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
            <Tab>Message</Tab>
            <Tab>Embed</Tab>
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
        console.log(v)
        onChange({
            ...data,
            message: v
        });
    }

    return <FormControl>
        <FormLabel htmlFor='content'>內容</FormLabel>
        <Input
            id='content'
            variant="main"
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
        name: "Basic",
        fields: [
            {
                name: "Title",
                id: "title",
                type: "string",
            },
            {
                name: "Description",
                id: "detail",
                type: "string"
            },
            {
                name: "Url",
                id: "url",
                type: "string"
            },
            {
                name: "Footer",
                id: "footer",
                type: "string"
            },
            {
                name: "Color",
                id: "color",
                type: "color"
            }
        ],
        mapper(field) {
            return <Field
                key={field.id}
                option={field}
                value={embed[field.id]}
                onChange={v => update(field.id, v)}
            />
        }
    }

    const advanced = {
        name: "Advanced",
        fields: [
            {
                name: "Footer",
                id: "footer",
                type: "string"
            }
        ],
        mapper(field) {
            return <Field
                key={field.id}
                option={field}
                value={embed[field.id]}
                onChange={v => update(field.id, v)}
            />
        }
    }

    const author = {
        name: "Author",
        fields: [
            {
                id: "name",
                name: "Name",
                type: "string"
            },
            {
                id: "link",
                name: "Link",
                type: "string"
            },
            {
                id: "icon",
                name: "Icon",
                type: "string"
            }
        ],
        mapper(field) {
            return <Field
                key={field.id}
                option={field}
                value={embed.author[field.id]}
                onChange={v => updateAuthor(field.id, v)}
            />
        }
    }

    return <FormControl>
        <Category {...info} isFirst />
        <Category {...author} />
        <Category {...advanced} />
    </FormControl>
}

function Category({isFirst, name, fields, mapper}) {
    return <>
        {!isFirst && <HSeparator my="5" />}
        <Text fontSize="2xl" fontWeight="bold" mt="5">{name}</Text>
        {fields.map(mapper)}
    </>
}

function Field({option, value, onChange}) {
    return <>
        <FormLabel mt="4">{option.name}</FormLabel>
        <OptionField value={value} onChange={onChange} option={option}/>
    </>
}