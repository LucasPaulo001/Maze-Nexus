import { useContext, useEffect, useState } from 'react'
import styles from './MyPosts.module.css'
import PostStructure from '../postStructure/PostStructure'
import { PostContext } from '../../contexts/PostsContext'

const MyPosts = ({userId}) => {
    const { posts, loading } = useContext(PostContext)
    const myPost = posts.filter((post) => {
        if (typeof post.author === 'object') {
            return post.author._id === userId
        }
        return post.author === userId
    })
    

  return (
    <div className={styles.posts}>
        <h4 className='mt-4'>Postagens: {myPost.length} post(s) </h4>
        {
            loading ? (
                <div class="spinner-grow text-primary d-flex justify-content-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ):myPost.length > 0 ?
             (myPost.map((post) => (
                <PostStructure 
                key={post._id} 
                post={post}
                />
            ))
            )
            :(
                <p>Você não tem postagens...</p>
            ) 
        }
    </div>
  )
}

export default MyPosts