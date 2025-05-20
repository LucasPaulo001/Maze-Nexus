import { useEffect, useState } from "react"
import styles from './PostsSaved.module.css'
import PostStructure from "../postStructure/PostStructure"
import { useContext } from "react"
import { PostContext } from "../../contexts/PostsContext"

const PostsSaved = ({userId}) => {
    const [savedPosts, setSavedPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [savedConfirm, setSavedConfirm] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const res = await fetch(`http://localhost:1526/user/profile/${userId}/savedPosts`)

                const resJson = await res.json()

                console.log(resJson.posts)
                setSavedPosts(resJson.posts)
                setSavedConfirm(true)
                setLoading(false)
            }
            catch(error){
                setLoading(false)
                console.log(error)
            }
        }
        fetchData()
    }, [userId])


  return (
    <div className={styles.savedPosts}>
        <h4 className="mt-4">Postagens salvas: {savedPosts.length} post(s)</h4>
        {
            loading ? (
                <div class="spinner-grow text-primary d-flex justify-content-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ):savedPosts.length > 0 ?
             (savedPosts.map((saved) => (
                <PostStructure 
                key={saved._id} 
                post={saved}
                savedPosts={savedConfirm}
                />
            ))
            )
            :(
                <p>Você não tem postagens salvas...</p>
            ) 
        }
    </div>
  )
}

export default PostsSaved