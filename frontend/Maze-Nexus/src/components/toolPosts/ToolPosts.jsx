import { useContext, useState, useEffect } from 'react'
import styles from './ToolPosts.module.css'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../../contexts/AuthContext'
import EditPost from '../modais/editPost/EditPost'
import { PostContext } from '../../contexts/PostsContext'

const ToolPosts = ({post, postId, author, addNewPost}) => {
  const [isClose, setClose] = useState(false)
  const [condition, setCondition] = useState(false)
  const [resp, setResp] = useState(null)
  const { savePost, savedPosts, removePostsSaved, success, deletePost, loading } = useContext(PostContext)

  
  const token = localStorage.getItem("token")
  const loggedUser = token ? jwtDecode(token) : null
  const isAuthor = loggedUser && loggedUser.id === author
  const userId = loggedUser.id
  const user = loggedUser

  //Confirmação para a exclusão do post
  const handleDelete = () => {
      if(condition){
        setCondition(false)
        return
      }
      setCondition(true)
  }
  if(resp){
    deletePost(postId)
  }
  
  //Abrir janela de postagem
  const handleOpenPost = () => {
    setClose(true)
  }

  const isPostSaved = savedPosts.includes(postId)

  return (
    <div className={`${styles.toolMenu} toolMenu`}>
        <ul className={styles.listTools}>
          {/* Links de postagens do autor */}
          {isAuthor ? (
            <>
              <li onClick={handleOpenPost}>
                <div className={`${styles.list} list`}>
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
                    <div className={`${styles.list} list`}>
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
                    <div className={`${styles.list} list`}> 
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
              <div className={`${styles.list} list`}>
                <div className={styles.okSave}>
                  {success && <span className='successMessage'>{success}</span>}
                </div>
                <button
                  onClick={() => {
                      console.log(`Clicado no botão -> isPostSaved: ${isPostSaved}, postId: ${postId}`);
                      isPostSaved ? removePostsSaved(userId, postId) : savePost(userId, postId);
                  }}
                  className='d-flex align-items-center gap-2'
              >
                  {isPostSaved ? (
                      <>
                          <i className="bi text-success bi-bookmark-fill"></i> Remover
                      </>
                  ) : (
                      <>
                          <i className="bi bi-bookmark"></i> Salvar
                      </>
                  )}
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