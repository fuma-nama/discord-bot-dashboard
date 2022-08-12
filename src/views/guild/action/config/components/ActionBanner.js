import React, {useContext} from "react";

// Chakra imports
import {Button, Flex, HStack, Text} from "@chakra-ui/react";
// Assets
import bannerImg from "assets/img/layout/NftBanner1.png";
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";
import {ActionDetailContext} from "contexts/actions/ActionDetailContext";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {addTask} from "api/yeecord";
import {AddIcon, SmallAddIcon} from "@chakra-ui/icons";

export default function ActionBanner() {
  const {name, description, banner} = useContext(ActionDetailContext);

  return (
      <Flex
          direction="column"
          bgImage={banner || bannerImg}
      bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="white"
        mb="14px"
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        {name}
      </Text>
        <Text
            color="white"
            mb="14px"
            fontWeight="700"
            lineHeight={{ base: "32px", md: "42px" }}
        >
            {description}
        </Text>
      <HStack align="center">
        <BackButton />
        <CreateButton />
      </HStack>
    </Flex>
  );
}

function CreateButton() {
  const {guild, action} = useParams();
  const navigate = useNavigate()

  const create = useMutation(
      () => addTask(guild, action),
      {
        onSuccess(data) {

          navigate(`../action/${action}/${data}`)
        }
      }
  )

  return <Button
      _hover={{ bg: "brand.400" }}
      bg="brand.400"
      color="white"
      py="20px"
      minH="full"
      onClick={create.mutate}
      isLoading={create.isLoading}
      leftIcon={<SmallAddIcon />}
  >
    創建新任務
  </Button>
}

function BackButton() {
  const { id: serverId } = useContext(GuildContext);

  return (
    <Link to={`/guild/${serverId}/actions`}>
      <Button
        bg="white"
        color="black"
        _hover={{ bg: "whiteAlpha.900" }}
        _active={{ bg: "white" }}
        _focus={{ bg: "white" }}
        fontWeight="500"
        fontSize="14px"
        py="20px"
        minH="full"
        leftIcon={<BiArrowBack />}
      >
        返回動作面板
      </Button>
    </Link>
  );
}
