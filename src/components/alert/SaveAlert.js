import {Alert, AlertIcon, Button, ButtonGroup, Slide, useColorModeValue,} from "@chakra-ui/react";
import {useAlertBg} from "../../utils/colors";

function BaseAlert({isOpen, children}) {
    let alertBg = useAlertBg()

    let mainText = useColorModeValue("navy.700", "white");

    return <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Alert
            w={{
                base: "calc(100vw - 6%)",
                md: "calc(100vw - 8%)",
                lg: "calc(100vw - 6%)",
                xl: "calc(100vw - 350px)",
                "2xl": "calc(100vw - 365px)",
            }}
            mx="auto"
            rounded="2xl"
            status="warning"
            backdropFilter="blur(10px)"
            bg={alertBg}
            textColor={mainText}
            mb="10"
            flexDirection={{base: "column", "2sm": "row"}}
        >
            <AlertIcon />
            {children}
        </Alert>
    </Slide>
}

export function SaveAlert({
  saving,
  visible,
  onSave,
  onDiscard,
}) {

  let brand = useColorModeValue("green.300", "green.500");

    return (
        <BaseAlert isOpen={visible}>
            您有一些未保存的更改
            <ButtonGroup ml={{
                base: "0",
                md: "auto"
            }}>
                <Button bg={brand} isLoading={saving} onClick={onSave}>
                    立即保存
                </Button>
                <Button onClick={onDiscard}>放棄更改</Button>
            </ButtonGroup>
        </BaseAlert>
    );
}

export function SubmitAlert({loading, visible, onSubmit}) {

  let brand = useColorModeValue("green.300", "green.500");

  return (
      <BaseAlert isOpen={visible}>
          您現在可以創建任務了
          <Button ml={{"2sm": "auto"}} bg={brand} isLoading={loading} onClick={onSubmit}>
              發布任務
          </Button>
      </BaseAlert>
  )
}