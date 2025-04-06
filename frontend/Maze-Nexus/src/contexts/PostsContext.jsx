import { useState, useEffect, createContext, useContext } from "react"
import { jwtDecode } from "jwt-decode"

//Criando contexto
export const PostContext = createContext()

//Criando provider
export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    //Buscando postagens
    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            try{    
                const res = await fetch('https://maze-nexus.onrender.com/user/posts')

                const dataJson = await res.json()

                setLoading(false)
                setPosts(dataJson.posts)
            }       
            catch(error){
                setLoading(false)
                console.log(error)
            }
        }  
        
        //Buscar posts salvos
        const fetchSavedPosts = async () => {
            try{
                const token = localStorage.getItem("token")
                if(token){
                    const decodeToken = jwtDecode(token)
                    const userId = decodeToken.id

                    const res = await fetch(`https://maze-nexus.onrender.com/user/profile/${userId}/savedPosts`)

                    const resJson = await res.json()

                    setSavedPosts(resJson.posts || [])
                }
            }
            catch(error){
                console.log(error)
            }
        }

        fetchSavedPosts()
        fetchPosts()
    }, [])

    //Adicionar postagem
    const addPost = async (newPost) => {
        setLoading(true)
        try{
            const res = await fetch('https://maze-nexus.onrender.com/user/post', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newPost)
            })

            const resJson = await res.json()

            if(res.ok){
                setError("")
                setSuccess("Postagem adicionada com sucesso!")
                setLoading(false)
                setPosts([...posts, resJson.post])
            }
        }
        catch(error){
            setSuccess("")
            setError("Erro ao fazer postagem")
            setLoading(false)
            console.log(error)
        }
    }

    //Excluir postagem
    const deletePost = async (postId) => {
        setLoading(true)
        try{
            const res = await fetch(`https://maze-nexus.onrender.com/user/delete/post/${postId}`, {
                method: 'DELETE',
            })

            if(res.ok){
                setLoading(false)
                setPosts((prevPost) => prevPost.filter((post) => post._id !== postId))
            }
        }
        catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    //Editar postagem
    const editPost = async (postId, updateData) => {
        setLoading(true)
        try{
            const res = await fetch(`https://maze-nexus.onrender.com/user/update/post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updateData)
            })
    
            const updatedPost = await res.json()
    
            if(res.ok){
                setError("")
                setSuccess("Postagem editada com sucesso!")
                setLoading(false)
                setPosts((prevPosts) => prevPosts.map((post) => (
                    post._id === postId ? {...post, ...updatedPost.attPost} : post
                )))
                console.log(posts)
                console.log(updatedPost.attPost)
            }
        }
        catch(error){
            setSuccess("")
            setError("Erro ao editar postagem!")
            setLoading(false)
            console.log(error)
        }
    }

    //Dar like nas postagens
    const likePost = async (userId, postId) => {
        try{
            const res = await fetch(`https://maze-nexus.onrender.com/user/like/post/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({userId})
            })
    
            const resJson = await res.json()
    
            if (res.ok) {
                setPosts((prevPosts) => 
                    prevPosts.map((post) =>
                        post._id === postId ? { ...post, likes: resJson.likes } : post
                    )
                )
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //Salvar postagens
    const savePost = async (userId, postId) =>{
        console.log(`https://maze-nexus.onrender.com/user/profile/${userId}/post/${postId}`)
        try{
            const res = await fetch(`https://maze-nexus.onrender.com/user/profile/${userId}/post/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            const resJson = await res.json()

            if(res.ok){
                setSavedPosts(prev => [...prev, postId])
                setSuccess("Postagem salva!")
                setTimeout(() => {
                    setSuccess("")
                }, 2000)
                
                console.log(resJson.post)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //Função para remover posts salvos
    const removePostsSaved = async (userId, postId) => {
        try{
            // Atualiza o estado local imediatamente, antes da requisição ao backend
            setSavedPosts(prev => prev.filter(id => id !== postId))

            console.log(`DELETE URL: https://maze-nexus.onrender.com/user/profile/${userId}/post/${postId}`);

            const res = await fetch(`https://maze-nexus.onrender.com/user/profile/${userId}/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })

            if(res.ok){
                console.log(userId, postId)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <PostContext.Provider value={{posts, savePost, savedPosts, removePostsSaved, likePost, addPost, success, error, setSuccess, loading, deletePost, editPost}}>
            {children}
        </PostContext.Provider>
    )
}