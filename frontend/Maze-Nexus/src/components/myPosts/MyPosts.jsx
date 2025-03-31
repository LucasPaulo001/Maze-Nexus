import { useEffect, useState } from 'react'
import styles from './MyPosts.module.css'
import PostStructure from '../postStructure/PostStructure'

const MyPosts = ({userId}) => {
    const [myPosts, setMyPosts] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        const fetchData = async () => {
            
            try{
                setLoading(true)
                const res = await fetch(`http://localhost:1526/user/myPosts/${userId}`)

                const dataJson = await res.json()

                if(dataJson.ok){
                    setTimeout(() => {
                        setLoading(false)
                    }, 700)
                    console.log(dataJson.posts)
                    setPosts(dataJson.posts)
                    
                }
            }
            catch(error){
                setLoading(false)
                console.log(error)
            }
        }
        fetchData()
    }, [userId])

  return (
    <div>
        {
            loading ? (
                <div class="spinner-grow text-primary d-flex justify-content-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ):posts.length > 0 ?
             (posts.map((post) => (
                <PostStructure 
                key={post._id} 
                post={post}
                />
            ))
            )
            :(
                <p>Você não fez nenhuma postagem...</p>
            ) 
        }
    </div>
  )
}

export default MyPosts