import React, {useContext} from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import NavAlert from "./NavAlert";
import {PageInfoContext} from "../../contexts/PageInfoContext";
import {useLocale} from "../../utils/Language";

export default function AdminNavbar() {
    const {info} = useContext(PageInfoContext)
    const locale = useLocale()

    const brandText = info ? info.name : "Loading..."

    return (
        <NavAlert rootText={locale({zh: "頁面", en: "Pages"})} childText={brandText}>
            <AdminNavbarLinks/>
        </NavAlert>
    );
}