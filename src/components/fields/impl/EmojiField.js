import {InputField} from "./InputField";
import {
    Box,
    Icon,
    IconButton,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure,
    useLatestRef,
} from "@chakra-ui/react";
import {Picker} from 'emoji-mart'
import React, {useEffect, useRef} from "react";
import {useQuery} from "react-query";
import {MdArrowDropDown} from "react-icons/md";
import {QueryHolderSkeleton} from "contexts/components/AsyncContext";
import {useTextColor} from "../../../utils/colors";

export default function EmojiField({value, onChange: change}) {
    const query = useQuery(
        "emojis",
        () => {
            return fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data')
                .then(res => res.json())
        },
        {
            refetchOnWindowFocus: false
        }
    )

    const onChange = (event) => {
        change(event.native)
    }

    const {onOpen, onToggle, isOpen, onClose} = useDisclosure()

    return <InputGroup>
        <InputField
            value={value}
            placeholder='Select a Emoji'
            readOnly
            onFocus={onToggle}
            _placeholder={{
                fontSize: "sm",
                fontWeight: "400",
                color: "secondaryGray.600"
            }}
            fontSize={30}
        />

        <Popover placement="top" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
                <InputRightElement>
                    <IconButton
                        icon={<Icon
                            h="18px"
                            w="18px"
                            as={MdArrowDropDown}
                        />}
                     aria-label="Select Emoji" />
                </InputRightElement>
            </PopoverTrigger>
            <PopoverContent bg="transparent" _focus={{outline: "none"}}>
                <QueryHolderSkeleton query={query}>
                    <EmojiPicker data={query.data} onChange={onChange}/>
                </QueryHolderSkeleton>
            </PopoverContent>
        </Popover>
    </InputGroup>
}

function EmojiPicker({data, onChange}) {
    const ref = useRef()
    const bg = useColorModeValue("244, 247, 254", "11, 20, 55");
    const textColor = useTextColor();
    const brand = useColorModeValue("51, 17, 219", "117, 81, 255")
    const change = useLatestRef(onChange)

    useEffect(() => {
        if (ref.current.childNodes.length !== 0)
            return

        new Picker({
            onEmojiSelect: e => change.current(e),
            data,
            ref,
            style: {
                "--rgb-background": bg,
            }
        })
    }, [])

    return <Box css={{
        'em-emoji-picker': {
            "--rgb-background": bg,
            "--rgb-accent": brand,
            "--rgb-input": bg
        },
    }} sx={{
        'em-emoji-picker': {
            w: "full",
            "--rgb-color": textColor
        },
    }}>
        <div ref={ref}/>
    </Box>
}