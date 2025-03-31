import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'
import { useState, useEffect } from 'react'
import MyPosts from '../../components/myPosts/MyPosts'
import { NavLink } from 'react-router-dom'

const Profile = () => {
    const { userId } = useParams()
    const [data, setUserData] = useState(null)
    const [openMyPosts, setOpenMyPosts] = useState(null)

    //Buscando usuário
    useEffect(() => {
        
        const fetchData = async () => {
            try{
                const res = await fetch(`http://localhost:1526/user/profile/${userId}`)

                const dataJson = await res.json()

                if(dataJson.ok){
                    console.log(dataJson.userData)
                    setUserData(dataJson.userData)
                }
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()
    }, [userId])

    //Função para abrir aba de minhas postagens
    const handleOpenMyPosts = () => {
        setOpenMyPosts(!openMyPosts)
    }

  return (
    <div className={`${styles.bodyProfile} bodyPage`}>
       {data ? (
            <>
            <h2>Bem vindo: {data.username || data.name}</h2>
            <hr />
            <nav className={styles.links}>
                <ul className={styles.listLinks}>
                    <li onClick={handleOpenMyPosts}>
                        <button>
                            Minhas postagens
                        </button>
                    </li>
                    <li>
                        <button>
                            Postagens Salvas
                        </button>
                    </li>
                    <li>
                        <button>
                            Configurações
                        </button>
                    </li>
                    <li>
                        <button>
                            Meus estudos
                        </button>
                    </li>
                    
                </ul>
            </nav>

            {/* Componente de postagens do usuário */}
            {openMyPosts && <MyPosts userId={userId} />}
        </>
        ) : (
            <div class="spinner-grow text-primary d-flex justify-content-center" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )}
    </div>
  )
}

export default Profile