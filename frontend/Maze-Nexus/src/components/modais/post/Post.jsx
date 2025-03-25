import { useEffect, useState } from 'react'
import '../../../index.css'
import styles from './Post.module.css'

const Post = ({isClose, setClose}) => {

    useEffect(() => {
        setClose(isClose)
    }, [isClose, setClose])

    const handleClose = () => {
        setClose(false)
    }

  return (
    <div>
        <div  className={isClose ? styles.windowPost: styles.windowPostClose}>
            <div className={styles.post}>
                <div className={styles.close}>
                    <i onClick={handleClose} class="bi bi-x-circle"></i>
                </div>
                <div className={styles.makePost}>
                    <form>
                        <div className={styles.localText}>
                            <textarea placeholder='Sobre o que você quer falar?' className={styles.textarea} name="">

                            </textarea>
                        </div>
                        <button className='btn btnPost btn-outline-success'>Publicar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post