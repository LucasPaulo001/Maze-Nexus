import { useState } from 'react'
import styles from './PostStructure.module.css'
import ToolPosts from '../toolPosts/ToolPosts'

const PostStructure = ({post, removePost}) => {
    const [like, setLike] = useState(false)
    const [menuTool, setMenuTool] = useState(false)

    const handleLike = () => {
        if(like){
            setLike(false)
        }
        else{
            setLike(true)
        }
        console.log(menuTool)
    }

    const handleOpenTools = () => {
        setMenuTool(prevMenuTool => !prevMenuTool)
    }

  return (
    <div className={styles.post}>
        <div className={styles.dataAuthor}>
            <div>
                <span>Author: </span><strong>{post.author.username}</strong>
            </div>

            <div className={styles.toolPosts}>
                <botton><i onClick={handleOpenTools} class="bi bi-three-dots"></i></botton>
            </div>
            <div className={menuTool ? styles.open : styles.close}>
                <ToolPosts post={post} author={post.author._id} postId={post._id} updateList={removePost} />
            </div>
        </div>
        <div className={styles.contentPost}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className={styles.localTools}>
                <div onClick={handleLike}>
                    {like ? (
                        <button className={styles.like}>
                            <i class="bi bi-heart-fill"></i>
                        </button>
                    ):(
                        <button>
                            <i class="bi bi-heart"></i>
                        </button>
                    )}
                </div>
                <i class="bi bi-chat-left-dots"></i>
            </div>
        </div>
    </div>
  )
}

export default PostStructure