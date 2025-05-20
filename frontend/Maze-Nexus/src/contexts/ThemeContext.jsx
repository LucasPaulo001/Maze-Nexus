import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [themeSelect, setThemeSelect] = useState(() => {
        const theme = localStorage.getItem("Theme")
        return theme || "light"
    })

    useEffect(() => {
        document.documentElement.className = themeSelect
        localStorage.setItem("Theme", themeSelect)
    }, [themeSelect])

    return (
        <ThemeContext.Provider value={{themeSelect, setThemeSelect}}>
            {children}
        </ThemeContext.Provider>
    )
}