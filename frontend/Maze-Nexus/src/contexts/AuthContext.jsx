import { createContext, useState, useEffect } from "react"


//Criando o context
export const AuthContext = createContext()

//Criando o Provider
export function AuthProvider({ children }){
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token")
        return token ? { token } : null
    })

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            setUser({ token })
        }
    }, [])

    const login = (token) => {
        localStorage.setItem("token", token)
        setUser({ token })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}