import {Alert, AlertIcon, Button, ButtonGroup, Slide,} from "@chakra-ui/react";
import {useAlertBg, useSuccessBg, useTextColor} from "../../utils/colors";
import {Locale} from "../../utils/Language";

function BaseAlert({isOpen, children}) {
    const alertBg = useAlertBg()
    const mainText = useTextColor();

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

export function SaveAlert({saving, visible, onSave, onDiscard}) {

    const brand = useSuccessBg()

    return (
        <BaseAlert isOpen={visible}>
            <Locale zh="您有一些未保存的更改" en="You have some unsaved Changes" />

            <ButtonGroup ml={{
                base: "0",
                md: "auto"
            }}>
                <Button bg={brand} isLoading={saving} onClick={onSave}>
                    <Locale zh="立即保存" en="Save Now" />
                </Button>
                <Button onClick={onDiscard}>
                    <Locale zh="放棄更改" en="Discard" />
                </Button>
            </ButtonGroup>
        </BaseAlert>
    );
}

export function SubmitAlert({loading, visible, onSubmit}) {

    const brand = useSuccessBg()

    return (
      <BaseAlert isOpen={visible}>
          <Locale zh="您現在可以創建任務了" en="You can create the Task Now" />

          <Button ml={{"2sm": "auto"}} bg={brand} isLoading={loading} onClick={onSubmit}>
              <Locale zh="發布任務" en="Publish" />
          </Button>
      </BaseAlert>
  )
}