import { useContext, useEffect, useState } from 'react'
import '../../../index.css'
import styles from './Post.module.css'
import { jwtDecode } from 'jwt-decode'
import { PostContext } from '../../../contexts/PostsContext'

//PostEdit são os dados do post passado para edição
const Post = ({postEdit, isClose, setClose, addNewPost}) => {
    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)
    const idUser = decoded.id

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { addPost, success, error, setSuccess } = useContext(PostContext)

    useEffect(() => {
        if (postEdit) {
            setTitle(postEdit.title);
            setContent(postEdit.content);
        }
    }, [postEdit]);

    useEffect(() => {
        setClose(isClose)
    }, [isClose, setClose])

    const handleClose = () => {
        setClose(false)
        //Os inputs são reiniciados caso não seja edição
        if(!postEdit){
            setTitle("")
            setContent("")
        }
        setSuccess("")
    }

    //Função para postar
    // const handlePost = async (e) => {
    //     e.preventDefault()

    //     //Validações
    //     if(!content){
    //         setError("Preecha o(s) campos!")
    //         return
    //     }

    //     try{
    //         const token = localStorage.getItem("token")
    //         const decoded = jwtDecode(token)
    //         const idUser = decoded.id

            
    //         let url = "http://localhost:1526/user/post"


    //         const res = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({title, content, idUser})
    //         })
            
    //         const resData = await res.json()
    //         console.log(resData)
    //         if(resData.ok){
    //             setSuccess("Postagem feita com sucesso!")
    //             setError("")
    //             addNewPost(resData.post)
    //         }
    //         await setTimeout(() => {
    //             handleClose()
    //         }, 800)
    //     }
    //     catch(error){
    //         setError("Erro interno, por favor tente novamente!")
    //         console.log(error)
    //     }
    // }

    //Função para postar
   

  return (
    <div>
        <div className={isClose ? styles.windowPost: styles.windowPostClose}>
            <div className={styles.post}>
            {success && <div className='successMessage'>{success}</div>}
            {error && <div className='errorMessage'>{error}</div>}
                <div className={styles.close}>
                    <i onClick={handleClose} class="bi bi-x-circle"></i>
                </div>
                <div className={styles.makePost}>
                    <form onSubmit={(e) => {e.preventDefault(), addPost({title, content, idUser})}}>
                        <div>
                            <input type="text" name='title' placeholder='Título *opcional'
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                            />
                        </div>
                        <div className={styles.localText}>
                            <textarea placeholder='Sobre o que você quer falar?' className={styles.textarea} 
                            value={content}
                            onChange={(e) => {setContent(e.target.value)}}
                            >

                            </textarea>
                            
                        </div>
                        <button type='submit' className='btn btnPost btn-outline-success'>
                           Publicar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post