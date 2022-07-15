import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import {BannerButton} from "components/card/Banner";
import {usePageInfo} from "contexts/PageInfoContext";
//assets
import MONEY from "assets/img/info/MONEY.jpg"
import Shark from "assets/img/info/Shark.jpg";
import Kane from "assets/img/info/Kane.png"
import RickRoll from "assets/img/info/rickroll.jpg"

export default function CreditsBoard() {
    usePageInfo("感謝面板")
    const supportBg = useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(0, 0, 0, 0.3)")

    return <>
        <Center flexDirection="column">
            <Heading
                textShadow='1px 1px 30px #000000'
                mt="15rem"
                mb={{base: "3rem", md: "6rem"}}
                fontSize={{base: "5xl", md: "8xl"}}
                color="white">
                貢獻者
            </Heading>
            <Button size="lg" mx="auto" bg="white" color="black">查看所有英雄</Button>
        </Center>

        <Box pt={{base: "80px", md: "150px"}}>
            <Flex
                flexDirection="column"
                mb="10"
                gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}
            >
                <Flex direction="column" gap={3} alignItems="start" p={5} bg={supportBg} rounded="lg">
                    <Text fontSize="2xl" fontWeight="bold">我們的英雄</Text>
                    <Text fontSize="xl">感謝在這個儀表板上付出生命的英雄</Text>
                    <BannerButton mt={5}>Support Us</BannerButton>
                </Flex>
                <Flex direction="column" justify="center" align="center" mt={8}>
                    <Content/>
                </Flex>
            </Flex>
        </Box>
    </>
}

function Content() {
    return <Grid
        mt={5}
        templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)"
        }}
        templateRows={{
            base: "auto 1fr 1fr",
        }}
    >
        {cards}
    </Grid>
}

function Item({children, ...rest}) {
    return <GridItem p={{base: 2, lg: 5}} {...rest}>
        {children}
    </GridItem>
}

function ItemImage(props) {
    return <Image
        w="full"
        borderRadius="8px"
        me="20px"
        loading="lazy"
        {...props}
    />
}

function ItemText(props) {
    return <Text fontWeight="bold" fontSize={{base: "2xl", md: "3xl", lg: "4xl"}} {...props} />
}

function ItemDetail(props) {
    return <Text {...props} />
}

function ItemTags({tags}) {
    return <HStack wrap="wrap" gap={2} spacing={0} mt={3}>
        {tags.map(tag =>
            <Box color="white" rounded="lg" marginInline={0} bg="brand.400" p={3}>
                {tag}
            </Box>
        )}
    </HStack>
}

const cards = [
    <Item colSpan={1} rowStart={1} rowEnd={1}>
        <ItemImage src={MONEY}/>
        <ItemText>MONEY</ItemText>
        <ItemDetail>
            不專業、沒有朋友的前端工程師
            <br/>
            負責大部分的前端工作
        </ItemDetail>
        <ItemTags tags={["UI/UX Design", "Frontend Develop"]}/>
    </Item>,
    <Item colSpan={1} rowStart={1} rowEnd={1}>
        <ItemImage src={Kane}/>
        <ItemText>Kane</ItemText>
        <ItemDetail>
            明明說是睡覺控卻淩晨幾點也不會睡覺的肝帝
            <br/>
            看見這種後端大佬請下跪 (
        </ItemDetail>
        <ItemTags tags={["Database Manage", "Backend Develop"]}/>
    </Item>,
    <Item rowStart={2} rowEnd={{base: 3, md: 4}} colStart={1} colEnd={3}>
        <ItemImage src={RickRoll}/>
        <ItemText>那些在語音頻道播Rickroll的傢伙</ItemText>
        <ItemDetail>傷害你的耳朵，然後放棄你。毀掉了我們整個社區和生活</ItemDetail>
        <ItemTags tags={Array(10).fill("滾出去")}/>
    </Item>,
    <Item colSpan={2} rowSpan={4}>
        <ItemImage src={Shark}/>
        <ItemText>某月的鯊鯊 (?</ItemText>
        <ItemDetail>
            鯊鯊很可愛，它可以治療你的心 ww
            <br/>
            鯊鯊救了MONEY的命，如果沒有鯊鯊，他就不會為Yeecord工作
        </ItemDetail>
        <ItemTags tags={["吉祥物", "可愛", "心理治療師"]}/>
    </Item>
]