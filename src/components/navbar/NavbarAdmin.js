import PropTypes from "prop-types";
import React, {useContext} from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import NavAlert from "./NavAlert";
import {PageInfoContext} from "../../contexts/PageInfoContext";

export default function AdminNavbar() {
    const {info} = useContext(PageInfoContext)

    const brandText = info ? info.name : "Loading..."

    return (
        <NavAlert rootText="頁面" childText={brandText}>
            <AdminNavbarLinks/>
        </NavAlert>
    );
}

AdminNavbar.propTypes = {
    brandText: PropTypes.string,
    variant: PropTypes.string,
    secondary: PropTypes.bool,
    fixed: PropTypes.bool,
    onOpen: PropTypes.func,
};
