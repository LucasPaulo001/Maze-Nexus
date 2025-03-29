import { useEffect, useState } from 'react'
import styles from './PostStructure.module.css'
import ToolPosts from '../toolPosts/ToolPosts'
import { jwtDecode } from 'jwt-decode'
import Comments from '../modais/comments/Comments'

const PostStructure = ({post, removePost, addNewPost}) => {
    const token = localStorage.getItem('token')
    const decoded = token ? jwtDecode(token) : null
    const userId = decoded?.id

    const [like, setLike] = useState(post.likes.includes(userId))
    const [likeCounts, setLikeCounts] = useState(post.likes.lenght)
    const [menuTool, setMenuTool] = useState(false)
    const [commentsWindow, setCommentsWindow] = useState(false)


    const handleLike = async () => {
        // Envia a requisição ao backend para adicionar/remover o like
        try {
            const url = `http://localhost:1526/user/like/post/${post._id}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const resJson = await res.json();

            if (resJson.liked) {
                setLike(true)
                setLikeCounts(resJson.likeCount)
            } else {
                setLike(false);
                setLikeCounts(resJson.likeCount);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenTools = () => {
        setMenuTool(prevMenuTool => !prevMenuTool)
    }

    //Janela de comentários
    const handleOpenComments = () => {
        setCommentsWindow(true)
    }

  return (
    <div className={styles.post}>
        <div className={styles.dataAuthor}>
            <div>
                <span>Author: </span><strong>{post.author.username || post.author.name}</strong>
            </div>

            <div className={styles.toolPosts}>
                <botton>
                    <i onClick={handleOpenTools} class="bi bi-three-dots"></i>
                </botton>
            </div>
            <div className={menuTool ? styles.open : styles.close}>
                <ToolPosts post={post} author={post.author._id} postId={post._id} updateList={removePost}  addNewPost={addNewPost}/>
            </div>
        </div>
        <div className={styles.contentPost}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className={styles.localTools}>
                <div className={styles.localLike} onClick={handleLike}>
                    {like ? (
                        <button className={styles.like}>
                            <i class="bi bi-heart-fill"></i>
                        </button>
                    ):(
                        <button>
                            <i class="bi bi-heart"></i>
                        </button>
                    )}
                    <span>{likeCounts}</span>
                    {post.likes.username}
                </div>
                <div>
                    <button onClick={handleOpenComments}>
                        <i class="bi bi-chat-left-dots"></i>
                    </button>

                    {/* Janela de comentários */}
                    <div className={commentsWindow ? styles.openComment : styles.CloseComment}>
                        <Comments postData={post} isClose={commentsWindow} setClose={setCommentsWindow} />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostStructure