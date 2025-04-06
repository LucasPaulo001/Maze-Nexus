import { useEffect, useState } from 'react'
import styles from './Comments.module.css'
import { jwtDecode } from 'jwt-decode'
import ToolComments from '../../toolComments/ToolComments'
import InputResp from '../../inputRespComment/InputResp'

const Comments = ({setClose, postData}) => {

    //Buscando dados do usuário do token e decodificando
    const token = localStorage.getItem("token")
    const decode = jwtDecode(token)
    const userId = decode.id

    //Estados de componentes
    const [comment, setComment] = useState([])
    const [newComment, setNewComment] = useState("")
    const [like, setLike] = useState()
    const [isToolComment, setIsToolComment] = useState({})
    const [resp, setResp] = useState(false)
    const [responses, setResponses] = useState({})

    const url = `https://maze-nexus.onrender.com/user/post/${postData._id}/comment`

    //Função de fechamento de comentários
    const handleClose = () => {
        setClose(prevClose => !prevClose)
    }

    //Buscando comentários
    const fetchData = async () => {
        try{
            const res = await fetch(url)
            const data = await res.json()
            setComment(data.comments)
        }
        catch(error){
            console.log(error)
        }
    } 

    //Chamando a função de busca de dados toda vez que o componente atualizar
    useEffect(() => {
        fetchData()
    }, [postData._id])

    //Função de tratamento de dados dos comentários
    const handleComment = async (e) => {
        e.preventDefault()

        if(!newComment.trim()) return

        try{

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userId, comment: newComment })
            })

            const json = await res.json()
            if(json.ok){
                setComment((prevComments) => [...prevComments, json.newComment])
                setNewComment("")
                fetchData()
            }
            else{
                console.log('erro')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //Função para dar like no comentário
    const handleLikeComment = async (commentId) => {
        try{
            const urlLikeComment = `https://maze-nexus.onrender.com/user/comment/${commentId}/like`

            const res = await fetch(urlLikeComment, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userId })
            })

            const json = await res.json()
            if(json.ok){
                console.log(json.liked)
                console.log(json.newLike)
                setLike(json.newLike)
                fetchData()
            }
        }
        catch(error){
            console.log(error)
        }
    }

    //Função para abrir ferramentas de comentários
    const handleToolComment = (commentId) => {
        setIsToolComment((prev) => ({
            ...prev,
        [commentId]: !prev[commentId],
        }))
    }

    //Função para abrir input de respostas (responder comentários)
    const handleOpenResp = (commentId) => {
        setResp((res) => ({
            ...res, [commentId]: !res[commentId]
        }))
    }


  return (
    <div className={styles.comments}>
        <h4>Comentários:</h4>
        <hr />
        <div className={styles.close}>
            <i onClick={handleClose} class="bi bi-x-circle"></i>
        </div>
        <div className={styles.bodyComment}>
            {Array.isArray(comment) && comment.length > 0 ? (
                comment.map((comment, index) => (
                    // Corpo do comentário
                    <div className={styles.contentComment} key={index}>

                        {/* Dados - nome e botão de ferramentas */}
                        <div className={styles.dataComment}>
                            <span> 
                                <strong>{comment.userId.username || comment.userId.name}</strong>
                            </span>

                            {/* Botão de janela de ferramentas para comentários */}
                            <button onClick={() => handleToolComment(comment._id)}>
                                <i class="bi bi-three-dots"></i>
                            </button>

                            {/* Janela de Ferramentas de comentários */}
                            {isToolComment[comment._id] && 
                                <div className='windowTool'>
                                    <ToolComments 
                                    attComments={fetchData()} //Função para requisitar novamente os dados
                                    commentValue={comment.comment}
                                    commentId={comment._id} 
                                    postId={postData._id} 
                                    author={comment.userId._id} 
                                    
                                    />
                                </div> 
                            }
                        </div>
                        {/* Comentário */}
                        {comment.comment}

                        {/* Interassão com o comentário - like e respostas */}
                        <div className={styles.toolComment}>

                            {/* Botão de like */}
                            <button className={styles.liked} onClick={() => {handleLikeComment(comment._id)}}>
                                <i class="bi bi-hand-thumbs-up"></i>
                                {comment.likes.length}
                            </button>
                            

                            {/* Botão de comentar */}
                            <button className='d-flex gap-2' onClick={() => handleOpenResp(comment._id)}>
                                <i class="bi bi-chat-left-text"></i>
                                {comment.responses.length}
                            </button>
                            
                        </div>
                       
                        {/* Componente de resposta */}
                        {resp[comment._id] && 
                            <div className= {resp ? "d-flex flex-column w-100" : "d-none"}>
                                <InputResp
                                comment={comment}
                                commentId={comment._id}
                                postId={postData._id}
                                commentAuthor={comment.userId} 
                                //fetchDataReload={fetchData()}
                                />
                                                
                            </div>
                        }
                        
                        <hr />
                    </div>
                    
                ))
            ) : (
                <p>Seja o primeiro a comentar!</p>
            )}
            
        </div>

        <form onSubmit={handleComment}>
            <div className={styles.localInput}>
                <button type='submit'>
                    <i class="bi bi-send"></i>
                </button>
                <input type="text" 
                placeholder='O que achou disso?'
                value={newComment} 
                onChange={(e) => {setNewComment(e.target.value)}}
                />
            </div>
        </form>
    </div>
  )
}

export default Comments