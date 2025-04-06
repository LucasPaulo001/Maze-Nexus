import { createContext, useState, useEffect } from "react"

//Criando o context
export const AuthContext = createContext()

//Criando o Provider
export function AuthProvider({ children }){
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token")
            try {
                if (token && typeof token === "string") {
                    return { token }
                }
            } catch (error) {
                console.error("Token inválido:", error)
                localStorage.removeItem("token")
            }
            return null
    })

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            try{
                setUser({ token })
            }   
            catch(error){
                console.log(error)
            }
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