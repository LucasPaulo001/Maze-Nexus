import { useContext, useEffect, useState } from 'react'
import '../../../index.css'
import styles from './Post.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'

//PostEdit são os dados do post passado para edição
const Post = ({postEdit, isClose, setClose, addNewPost}) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

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
    const handlePost = async (e) => {
        e.preventDefault()

        //Validações
        if(!content){
            setError("Preecha o(s) campos!")
            return
        }

        try{
            const token = localStorage.getItem("token")
            const decoded = jwtDecode(token)
            const idUser = decoded.id

            //Caso seja edição muda de api
            let url = "http://localhost:1526/user/post"


            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({title, content, idUser})
            })
            
            const resData = await res.json()
            console.log(resData)
            if(resData.ok){
                setSuccess("Postagem feita com sucesso!")
                setError("")
                addNewPost(resData.post)
            }
            await setTimeout(() => {
                handleClose()
            }, 800)
        }
        catch(error){
            setError("Erro interno, por favor tente novamente!")
            console.log(error)
        }
    }

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
                    <form onSubmit={handlePost}>
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