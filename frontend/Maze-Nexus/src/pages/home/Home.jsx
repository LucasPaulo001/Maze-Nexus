import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Post from '../../components/modais/post/Post'
import PostStructure from '../../components/postStructure/PostStructure'
const urlPosts = 'http://localhost:1526/user/posts'

function Home(){
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [isClose, setClose] = useState(false)
    const [drop, setDrop] = useState(false)

    //Função para atualizar feed ao fazer postagem ou editar postagens
    const addNewPost = (newPost, isEditing = false) => {
        setPosts((prevPosts) => isEditing 
        ? prevPosts.map((p) => (p._id === newPost._id ? newPost : p))
        :[newPost, ...prevPosts])
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try{
                const res = await fetch(urlPosts)

                const resData = await res.json()
                console.log(resData)
                if(resData.ok){
                    setTimeout(() => {
                        setLoading(false)
                    }, 1500)
                    setPosts(resData.posts)
                }
            }
            catch(error){
                console.log(error)
            }
        }
        fetchPosts()
    }, [urlPosts])

    const removePostDeleted = (postId) => {
        setPosts(posts.filter(post => post._id !== postId))
    }

    const handleOpenPost = () => {
        setClose(true)
    }
    const handleEnter = () => {
        setDrop(true)
    }

    const handleDown = () => {
        setDrop(false)
    }
    


    return(
        <>
        {/* Feed */}
            <div className='contentFeed'>

                {/* Janela de grupos e outras informações */}
                <div className={styles.toolsMenu}>
                    <h4>Janela de grupos e outras informações</h4>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sapiente rerum corporis magnam veritatis eum repudiandae quasi necessitatibus, obcaecati consectetur, perferendis facilis cum earum, reprehenderit eligendi totam commodi ipsum maiores.
                </div>

                {/* Janela de postagens */}
                <div className={styles.toolFeed}>
                    {/* Input para iniciar publicações */}
                    <div className={styles.localBtnPost}>
                        <div className={styles.contentBtns}>
                            <button onClick={handleOpenPost} onMouseEnter={handleEnter} onMouseLeave={handleDown} className={styles.btnAddP}>
                                <i class="bi bi-plus-square"></i>
                            </button>
                        </div>

                        <span className={drop ? styles.ok : styles.no}>
                            Fazer post
                        </span>
                    </div>

                    {/* Componente de janela modal para post */}
                    {isClose && (
                        <Post 
                            isClose={isClose} 
                            setClose={setClose} 
                            addNewPost={addNewPost} 
                        />
                    )}
    
                    {posts.length > 0 ? (
                        posts.map((post) => 
                        <PostStructure 
                        key={post._id} 
                        post={post} 
                        removePost={removePostDeleted} 
                        handleOpenPost={handleOpenPost} 
                        addNewPost={addNewPost} 
                        
                        />)
                    ):( loading ? 
                        (<div className={styles.loadingPosts}>
                            <span>Carregando posts</span>
                            <div class="spinner-grow text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>):(
                            <div className={styles.nothing}>
                                <h4>Nenhum post por aqui...</h4>
                            </div>
                            
                        )
                    )}
                </div>

                {/* Janela de Sugestões e conteúdos relevântes */}
                <div className={styles.toolRelevants}>
                    <h4>Janela de Sugestões e conteúdos relevantes</h4>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum iusto numquam quas nobis pariatur incidunt doloremque. Porro pariatur ullam cumque debitis id itaque suscipit, voluptatum, labore doloremque cum impedit laudantium?
                </div>
            </div>
        </>
    )
}

export default Home