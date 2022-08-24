import {createContext, useContext, useEffect, useState} from "react";

export const FeaturesLayoutContext = createContext({
    banner: {
        title: null,
        description: null,
        buttons: null
    },
    dataList: null,
    update: () => {}
})

export function useLayoutUpdate(props) {
    const {update} = useContext(FeaturesLayoutContext)

    useEffect(
        () => update(props),
        []
    )
}

export function FeaturesLayoutProvider({initial = {}, children}) {
    const [context, setContext] = useState(initial)

    return <FeaturesLayoutContext.Provider
        value={{
            ...context,
            update(next) {
                setContext(next)
            }
        }}>
        {children}
    </FeaturesLayoutContext.Provider>
}