import { useContext, useEffect, useState } from 'react'
import '../../../index.css'
import styles from './Post.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
const urlPost = 'http://localhost:1526/user/post'

const Post = ({isClose, setClose, addNewPost}) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        setClose(isClose)
    }, [isClose, setClose])

    const handleClose = () => {
        setClose(false)
        setTitle("")
        setContent("")
        setSuccess("")
    }

    //Função para postar
    const handlePost = async (e) => {
        e.preventDefault()

        try{
            const token = localStorage.getItem("token")
            const decoded = jwtDecode(token)
            const idUser = decoded.id
            const res = await fetch(urlPost, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({title, content, idUser})
            })
            
            const resData = await res.json()
            console.log(resData)
            if(resData.ok){
                addNewPost(resData.post)
                setSuccess("Postagem feita com sucesso!")
            }
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
                        <button type='submit' className='btn btnPost btn-outline-success'>Publicar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post