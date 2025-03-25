import { useState } from 'react'
import styles from './Home.module.css'
import Post from '../../components/modais/post/Post'

function Home(){
    const [isClose, seClose] = useState(false)
    const [drop, setDrop] = useState(false)

    const handleOpenPost = () => {
        seClose(true)
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
            <div className={styles.contentFeed}>

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
                    <Post isClose={isClose} setClose={seClose} />
    
                    <h4>Janela de postagens</h4>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum dolore rerum ratione, aut minima id exercitationem perspiciatis delectus, ipsam illum similique cupiditate maxime neque expedita omnis esse debitis nam? Minima.
                </div>

                {/* Janela de Sugestões e conteúdos relevântes */}
                <div className={styles.toolRelevants}>
                    <h4>Janela de Sugestões e conteúdos relevântes</h4>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum iusto numquam quas nobis pariatur incidunt doloremque. Porro pariatur ullam cumque debitis id itaque suscipit, voluptatum, labore doloremque cum impedit laudantium?
                </div>
            </div>
        </>
    )
}

export default Home