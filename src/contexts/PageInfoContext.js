import {createContext, useContext, useEffect, useState} from "react";
import routes from "../routes";

export const PageInfoContext = createContext({
    routes: null,
    toggleSidebar: null,
    setToggleSidebar: null,
    info: null,
    setInfo: null
});

export function usePageInfo(name) {
    const {setInfo} = useContext(PageInfoContext);

    useEffect(() => {
        setInfo({
            name,
        })
    }, Array.isArray(name)? name: [name])
}

export function PageInfoProvider({children}) {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [info, setInfo] = useState({
        name: [],
    })

    return <PageInfoContext.Provider
        value={{
            routes,
            toggleSidebar,
            setToggleSidebar,
            info,
            setInfo
        }}>
        {children}
    </PageInfoContext.Provider>
}