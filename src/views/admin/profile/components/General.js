// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Yeecord RPG 個人信息
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Yeecord這個世界真的很Yee, 仿佛就像是去到了Yee之地, 你甚至見到了Yee帝,
        而這個就是你的Yee面板...
      </Text>
      <SimpleGrid columns="2" gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Education"
          value="Stanford University"
        />
        <Information
          boxShadow={cardShadow}
          title="Languages"
          value="English, Spanish, Italian"
        />
        <Information
          boxShadow={cardShadow}
          title="Department"
          value="Product Design"
        />
        <Information
          boxShadow={cardShadow}
          title="Work History"
          value="Google, Facebook"
        />
        <Information
          boxShadow={cardShadow}
          title="Organization"
          value="Simmmple Web LLC"
        />
        <Information
          boxShadow={cardShadow}
          title="Birthday"
          value="20 July 1986"
        />
      </SimpleGrid>
    </Card>
  );
}
