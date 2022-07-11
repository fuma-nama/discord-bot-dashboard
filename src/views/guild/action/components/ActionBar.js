import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, {useContext, useState} from "react";
import {SelectField} from "../../../../components/fields/SelectField";
import {ActionTypesContext} from "../../../../contexts/actions/ActionsContext";
import {useMutation, useQueryClient} from "react-query";
import {addAction} from "../../../../api/yeecord";
import {useParams} from "react-router-dom";
import {InputField} from "../../../../components/fields/InputField";

export function ActionBar() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return <Card p="0px">
            <Flex
                direction="column"
                w="100%"
                px="22px"
                py="18px"
            >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                    管理動作
                </Text>
                <Text color={textColor} mb={10}>
                    添加新的動作或克隆它們
                </Text>
                <Control />
            </Flex>
    </Card>
}

function Control() {
    const queryClient = useQueryClient()

    const {id: serverId} = useParams()
    const {types} = useContext(ActionTypesContext)

    const [description, setDescription] = useState("")
    const [type, setType] = useState(null)
    const [error, setError] = useState(false)

    const typeOptions = types.map(type => ({
        label: type.name,
        value: type.id
    }))

    const mutation = useMutation(
        (args) => addAction(serverId, ...args), {
        onSuccess: () => {
            return queryClient.invalidateQueries(['actions', serverId])
        },
    })

    const onSubmit = () => {
        if (type == null) {
            setError(true)
            return
        }

        setError(false)
        mutation.mutate([type, description])
    }

    return <FormControl>
        <FormLabel htmlFor='type'>動作類型</FormLabel>
        <SelectField
            id='type'
            placeholder="選擇一種操作類型"
            value={type}
            onChange={setType}
            options={typeOptions}
            isInvalid={error && type == null}
        />
        <FormLabel htmlFor='detail'>描述</FormLabel>
        <InputField
            id='detail'
            placeholder="動作描述 (可選)"
            value={description}
            onChange={({target}) => setDescription(target.value)}
        />
        <FormHelperText>你可以稍後給它一個描述</FormHelperText>
        <Button
            mt={4}
            isLoading={mutation.isLoading}
            type='submit'
            onClick={onSubmit}
        >
            添加新動作
        </Button>
    </FormControl>
}