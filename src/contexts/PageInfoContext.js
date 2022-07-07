import {createContext, useContext, useEffect} from "react";

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
            name: name
        })
    }, [])
}