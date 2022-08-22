import React from "react";
import {Link as LinkText, List, ListItem} from "@chakra-ui/react";
import {config} from "config/config";
import Footer from "./Footer";
import {useLocale} from "utils/Language";
import {useTextColor} from "../../utils/colors";

export default function AdminFooter() {
    const textColor = useTextColor();
    const locale = useLocale()

    return (
        <Footer>
            <List display='flex'>{
                config.footer.map((item, i) => (
                    <ListItem
                        key={i}
                        me={{
                            base: "20px",
                            md: "44px",
                        }}>
                        <LinkText
                            fontWeight='500'
                            color={textColor}
                            href={item.url}
                        >
                            {locale(item.name)}
                        </LinkText>
                    </ListItem>
                ))
            }
            </List>
        </Footer>
    );
}
