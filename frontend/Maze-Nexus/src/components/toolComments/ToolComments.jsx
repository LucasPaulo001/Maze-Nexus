import { jwtDecode } from "jwt-decode"
import styles from './ToolComments.module.css'
import { useEffect, useState } from "react"
import EditComment from "../modais/editComment/EditComment"

const ToolComments = ({attComments, commentValue, commentId, postId, author}) => {
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  const isAuthor = decode.id

  const [loading, setLoading] = useState(false)
  const [isOpenEditComment, setIsOpenEditComment] = useState(false)

  const url = `http://localhost:1526/user/post/${postId}/delete/${commentId}`

  //Função para deletar comentário
  const handleDeleteComment = async () => {
    setLoading(true)
    setTimeout( async () => {
      try{
        const res = await fetch(url, {
          method: 'DELETE',
          headers:{
            'Content-type': 'application/json'
          }
        })
    
        const dataJson = await res.json()
        if(dataJson.ok){
          setLoading(false)
        }
      }
      catch(error){
        setLoading(false)
        console.log(error)
      }
    }, 700)
  }


  //Atualiza o componente chamando a função passada por prop (para requisitar novamente os dados)
  useEffect(() => {
    attComments
  }, [postId])


  const handleOpenEditComment = () => {
    if(isOpenEditComment){
      setIsOpenEditComment(false)
    }
    else{
      setIsOpenEditComment(true)
    }
  }

  return (
    <div>
      <ul>
        {isAuthor === author 
        ? 
          <>
            <div className="listTools">
              <li>
                <div onClick={handleDeleteComment} className="list">
                  <i class="bi bi-trash"></i>
                  {loading 
                  ? <span className="d-flex align-items-center gap-3">
                      <div class="spinner-grow text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      Excluindo...
                    </span>
                  : <span>Excluir</span>
                  }
                </div>
              </li>
            
              <li>
                <div onClick={handleOpenEditComment} className="list">
                  <i class="bi bi-pencil"></i>
                  Editar
                </div>
                <div className={isOpenEditComment ? "windowEdit": "windowEditClose"}>  
                  <EditComment 
                  setOpen={setIsOpenEditComment} 
                  isOpen={isOpenEditComment} 
                  commentValue={commentValue} 
                  commentId={commentId} 
                  postId={postId}
                  />
                </div>

              </li>
            </div>
          </>
        : 
          <>
            <div className="listTools">
              <li>
                <div className="list">
                  <i class="bi bi-flag"></i>
                  Denunciar
                </div>
              </li>
            </div>
          </>
        }
      </ul>
      
    </div>
  )
}

export default ToolComments