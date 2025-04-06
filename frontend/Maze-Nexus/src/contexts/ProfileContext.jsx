import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"

export const ProfileContext = createContext()
const token = localStorage.getItem("token")
const decode = jwtDecode(token)
const userId = decode.id

const url = `http://localhost:1526/user/profile/${userId}/schedule/note`

export const ProfileProvider = ({ children }) => {
    const [notes, setNotes] = useState([{}])
    const [newNote, setNewNote] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)


    //Buscando anotações
        const fetchData = async () => {
            try{
                const res = await fetch(url)

                const data = await res.json()

                if(res.ok){
                    setLoading(false)
                    console.log(data)
                    setNotes(data.notes)
                }
            }
            catch(error){
                setLoading(false)
                console.log(error)
            }
        }

    useEffect(() => {
        fetchData()
    }, [url])

    //Salvar anotações
      const handleSaveNote = async (userId, id, newNote) => {
        try{
          const res = await fetch(`http://localhost:1526/user/profile/${userId}/schedule/${id}/note`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ notes: newNote })
          })
    
          const data = await res.json()
    
          if(res.ok){
            setSuccess("Anotação salva!")
            setTimeout(() => {
              setSuccess("")
            }, 900)
            console.log(data)
            setNotes(prev => [...prev, data.notes])
            setNewNote("")
            fetchData()
          }
        }
        catch(error){
          console.log(error)
        }
      }
    

    return (
        <ProfileContext.Provider value={{notes, newNote, loading, setNotes, setNewNote, handleSaveNote, success, setSuccess}}>
            {children}
        </ProfileContext.Provider>
    )

}
