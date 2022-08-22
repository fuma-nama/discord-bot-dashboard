// Chakra imports
import {SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import {useDetailColor, useNoteColor, useTextColor} from "utils/colors";

export default function InformationMap({name, description, value, ...rest}) {
    // Chakra Color Mode
    const textColorPrimary = useTextColor();
    const textColorSecondary = useNoteColor();
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    return (
        <Card {...rest}>
            <Text
                color={textColorPrimary}
                fontWeight="bold"
                fontSize="2xl"
                mt="10px"
                mb="4px"
            >
                {name}
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
                {description}
            </Text>

            <SimpleGrid columns={2} gap="20px">{
                value.map((item, key) =>
                    <Information
                        key={key}
                        boxShadow={cardShadow}
                        title={item.name}
                        value={item.value}
                    />
                )
            }
            </SimpleGrid>
        </Card>
    );
}

function Information(props) {
    const { title, value, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useTextColor();
    const textColorSecondary = useDetailColor();
    const bg = useColorModeValue("white", "navy.700");

    return (
        <Card bg={bg} {...rest}>
            <Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
                {title}
            </Text>
            <Text color={textColorPrimary} fontWeight='500' fontSize='md'>
                {value}
            </Text>
        </Card>
    );
}