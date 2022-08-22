// chakra imports
import {Box, Center, Flex, Icon, Image, Text} from "@chakra-ui/react";
import {MdUpgrade} from "react-icons/md";
import React from "react";
import {useTextColor} from "../../utils/colors";

export function NotificationItem({title, description, image}) {
  const textColor = useTextColor();
  return (
    <>
        <Box
            rounded="md"
            me='14px'
            h={{ base: "60px", md: "70px" }}
            w={{ base: "60px", md: "70px" }}
            overflow="hidden"
        >
            {image?
                <Image src={image}/> :
                <ItemIcon />
            }
        </Box>

      <Flex flexDirection='column'>
        <Text
          mb='5px'
          fontWeight='bold'
          color={textColor}
          fontSize={{ base: "md", md: "md" }}>
          {title}
        </Text>
        <Flex alignItems='center'>
          <Text
            fontSize={{ base: "sm", md: "sm" }}
            lineHeight='100%'
            color={textColor}>
              {description}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

function ItemIcon() {
    return <Center
        h="full"
        bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'>
        <Icon as={MdUpgrade} color='white' w={8} h={14} />
    </Center>
}