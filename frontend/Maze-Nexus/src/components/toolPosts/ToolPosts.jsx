import { useContext, useState, useEffect } from 'react'
import styles from './ToolPosts.module.css'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../../contexts/AuthContext'
import EditPost from '../modais/editPost/EditPost'

const ToolPosts = ({post, postId, updateList, author, addNewPost}) => {
  const [loading, setLoading] = useState(false)
  const [isClose, setClose] = useState(false)
  const [condition, setCondition] = useState(false)
  const [resp, setResp] = useState(null)
  const { user } = useContext(AuthContext)

  
  const token = localStorage.getItem("token")
  const loggedUser = token ? jwtDecode(token) : null
  const isAuthor = loggedUser && loggedUser.id === author
  const userId = loggedUser.id

  //Função para deletar postagem
  const handleDelete = () => {
    //const confirmation = confirm("Tem certeza que deseja deletar a postagem?")
    if(condition){
      setCondition(false)
      return
    }
    setCondition(true)
  }
    useEffect(() => {
      if(resp){
        setLoading(true)
        setTimeout(() => {
          const respDelete = async () => {
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
              setResp(null)
              setCondition(false)
            }
          }
          respDelete()
        }, 900)
      }
    }, [resp])

  //Abrir janela de postagem
  const handleOpenPost = () => {
    setClose(true)
  }

  //Salvar postagem
  const handleSave = async () => {
    const res = await fetch(`http://localhost:1526/user/profile/${userId}/post/${postId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    })

    const resJson = await res.json()
    console.log(userId, postId)
    console.log(resJson)
  }

  return (
    <div className={styles.toolMenu}>
        <ul className={styles.listTools}>
          {/* Links de postagens do autor */}
          {isAuthor ? (
            <>
              <li onClick={handleOpenPost}>
                <div className={styles.list}>
                  <i class="bi bi-pencil"></i>
                  Editar
                </div>
              </li>

              <EditPost isClose={isClose} 
              setClose={setClose} 
              postEdit={post}
              addNewPost={addNewPost}
              />
              <li onClick={handleDelete}>
                {loading ? (
                  <>
                    <div className={styles.list}>
                      <div className={`${styles.spinner} spinner-grow text-primary`} role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <span>
                        Excluindo
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.list}> 
                      <i class="bi bi-trash"></i>
                      Excluir
                    </div>
                    <div className={condition ? styles.openConditions : styles.btnsCondition}>
                      Excluir?
                      <button onClick={() => {setResp(true)}} className='btn btn-success'>Sim</button>
                      <button onClick={() => {setResp(false)}} className='btn btn-danger'>Não</button>
                    </div>
                  </>
                  
                )}
              </li>
            </>
          ) : (
            // Links de publicações de terceiros
            <>
            <li>
              <div className={styles.list}>
                <button onClick={handleSave} className='d-flex align-items-center gap-2'>
                  <i class="bi bi-bookmark"></i>
                  Salvar
                </button>
              </div>
            </li>

            <li>
              <div className={styles.list}>
                  <i class="bi bi-flag"></i>
                  Denunciar publicação
              </div>
            </li>
            </>
          )}
        </ul>
    </div>
  )
}

export default ToolPosts