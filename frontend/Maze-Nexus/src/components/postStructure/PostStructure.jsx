import { useContext, useEffect, useState } from 'react'
import styles from './PostStructure.module.css'
import ToolPosts from '../toolPosts/ToolPosts'
import { jwtDecode } from 'jwt-decode'
import Comments from '../modais/comments/Comments'
import { PostContext } from '../../contexts/PostsContext'

const PostStructure = ({savedPosts, post, removePost, addNewPost}) => {
    const token = localStorage.getItem('token')
    const decoded = token ? jwtDecode(token) : null
    const userId = decoded?.id

    const [menuTool, setMenuTool] = useState(false)
    const [commentsWindow, setCommentsWindow] = useState(false)
    const [quantComments] = useState(post.comments.length)
    const { likePost } = useContext(PostContext)


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
                <ToolPosts 
                post={post} 
                author={post.author._id} 
                postId={post._id} 
                updateList={removePost}  
                addNewPost={addNewPost}
                savedPosts={savedPosts}
                />
            </div>
        </div>
        <div className={styles.contentPost}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className={styles.localTools}>
                <div 
                className={styles.localLike} 
                onClick={() => likePost(userId, post._id)}>
                    {post.likes.includes(userId) ? (
                        <button className={styles.like}>
                            <i class="bi bi-heart-fill"></i>
                        </button>
                    ):(
                        <button>
                            <i class="bi bi-heart"></i>
                        </button>
                    )}
                    <span>{post.likes.length}</span>
                    
                </div>
                <div>
                    <button className='d-flex align-items-center gap-2' onClick={handleOpenComments}>
                        <i class="bi bi-chat-left-dots"></i>
                        <span>{quantComments}</span>
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