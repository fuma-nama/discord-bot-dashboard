import {createContext, useContext, useEffect, useState} from "react";

export const LayoutContext = createContext({
    banner: {
        title: null,
        description: null,
        buttons: null
    },
    dataList: null,
    update: () => {}
})

export function useLayoutUpdate(props) {
    const {update} = useContext(LayoutContext)

    useEffect(
        () => update(props),
        []
    )
}

export function LayoutProvider({initial = {}, children}) {
    const [context, setContext] = useState(initial)

    return <LayoutContext.Provider
        value={{
            ...context,
            update(next) {
                setContext(next)
            }
        }}>
        {children}
    </LayoutContext.Provider>
}