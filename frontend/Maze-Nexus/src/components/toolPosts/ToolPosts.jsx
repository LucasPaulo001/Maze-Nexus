import { useContext, useState, useEffect } from 'react'
import styles from './ToolPosts.module.css'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../../contexts/AuthContext'
import Post from '../modais/post/Post'

const ToolPosts = ({post, postId, updateList, author}) => {
  const [loading, setLoading] = useState(false)
  const [isClose, setClose] = useState(false)
  const { user } = useContext(AuthContext)

  
  const token = localStorage.getItem("token")
  const loggedUser = token ? jwtDecode(token) : null
  const isAuthor = loggedUser && loggedUser.id === author

  //Função para deletar postagem
  const handleDelete = async () => {
    const confirmation = confirm("Tem certeza que deseja deletar a postagem?")

    if(confirmation){
      setLoading(true)
      try{  
        const urlDelete = `http://localhost:1526/user/delete/post/${postId}`

        const res = await fetch(urlDelete, {
          method: 'POST',
        })
        const data = await res.json()
        console.log(data)
        if(data.ok){
          setLoading(false)
          updateList(postId)
        }
      }
      catch(error){
        setLoading(false)
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
  }
  const handleOpenPost = () => {
    setClose(true)
  }

  useEffect(() => {
    console.log("isClose mudou para:", isClose);
  }, [isClose]);

  return (
    <div className={styles.toolMenu}>
        <ul className={styles.listTools}>
          {isAuthor ? (
            <>
              <li onClick={handleOpenPost}>
                <i class="bi bi-pencil"></i>
                Editar
              </li>
              <Post isClose={isClose} 
              setClose={setClose} 
              postEdit={post}
              />
              <li onClick={handleDelete}>
                {loading ? (
                  <>
                    <div className={`${styles.spinner} spinner-grow text-primary`} role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <span>
                      Excluindo
                    </span>
                  </>
                ) : (
                  <>
                    <i class="bi bi-trash"></i>
                    Excluir
                  </>
                  
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <i class="bi bi-bookmark"></i>
                Salvar
              </li>
              <li>
                <i class="bi bi-flag"></i>
                Denunciar publicação
              </li>
            </>
          )}
        </ul>
    </div>
  )
}

export default ToolPosts