import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'
import { useState, useEffect } from 'react'
import MyPosts from '../../components/myPosts/MyPosts'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Settings from '../../components/settings/Settings'
import PostsSaved from '../../components/postsSaves/PostsSaved'
import MyStudies from '../../components/myStudies/MyStudies'
import OrgStudies from '../../components/myStudies/orgStudies/OrgStudies'

const Profile = () => {
    //Dados do usuário logado
    const token = localStorage.getItem("token")
    let userDataId = null
    if(token){
        try{
            const decode = jwtDecode(token)
            userDataId = decode.id
        }
        catch(error){
            console.log(error)
            localStorage.removeItem("token")
        }
    }
    const { userId } = useParams()
    const [data, setUserData] = useState(null)
    const [openMyPosts, setOpenMyPosts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dataUser, setDataUser] = useState(null)
    const [openSettings, setOpenSettings] = useState(null)
    const [openSaves, setOpenSaves] = useState(null)
    const [openStudies, setOpenStudies] = useState(null)
    const [orgs, setOrgs] = useState(true)
    const [menuMob, setMenuMob] = useState(false)
    
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    //Buscando usuário
    useEffect(() => {
        
        const fetchData = async () => {
            try{
                const res = await fetch(`https://maze-nexus.onrender.com/user/profile/${userId}`)

                const dataJson = await res.json()

                if(dataJson.ok){
                    setUserData(dataJson.userData)
                    setDataUser(dataJson.userData)
                }
            }
            catch(error){
                console.log(error)
            }
        }

        fetchData()
    }, [userId, data])

    //Função para abrir aba de minhas postagens
    const handleOpenMyPosts = () => {
        setOpenMyPosts(!openMyPosts)
        setOpenSettings(false)
        setOpenSaves(false)
        setOpenStudies(false)
        setOrgs(false)
        setMenuMob(false)
    }

    //Função para abrir as configurações
    const handleOpenSettings = () => {
        setOpenSettings(!openSettings)
        setOpenMyPosts(false)
        setOpenSaves(false)
        setOpenStudies(false)
        setOrgs(false)
        setMenuMob(false)
    }

    //Função para abrir postagens salvas
    const handleOpenSaves = () => {
        setOpenSaves(!openSaves)
        setOpenMyPosts(false)
        setOpenSettings(false)
        setOpenStudies(false)
        setOrgs(false)
        setMenuMob(false)
    }

    //Função para abrir estudos do usuário
    const handleOpenStudies = () => {
        setOpenStudies(!openStudies)
        setOpenSaves(false)
        setOpenMyPosts(false)
        setOpenSettings(false)
        setOrgs(false)
        setMenuMob(false)
    }

    useEffect(() => {
        if (!openMyPosts && !openSaves && !openSettings && !openStudies) {
            setOrgs(true)
        } else {
            setOrgs(false)
        }
    }, [openMyPosts, openSaves, openSettings, openStudies])

    //logout
    const handlelogout = () => {
        setLoading(true)

        setInterval(() => {
            logout()
            navigate('/login')
        }, 900)
        
    }


  return (
    <div className={`${styles.bodyProfile} bodyPage`}>
       {data ? (
            <>
            <div>
                <div className={styles.topProfile}>
                    <h4>Bem vindo(a): {data.username || data.name}</h4>
                    <button className={styles.logout} onClick={handlelogout}>
                    {loading ? (
                        <>
                        Saindo...
                        <div className="spinner-grow text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        </>
                    ) : (
                        <>
                            Sair
                            <i class="bi bi-box-arrow-right"></i>
                        </>
                    )}
                </button>
            </div>

            {/* Dados do usuário */}
            <div className={`${styles.bio} mt-4 p-3`}>
                <h5>Biografia:</h5>
                <div className={styles.bioUser}>
                    {data.bio 
                    ?(
                        <p>{data.bio}</p>
                    ) 
                    :(
                        <p>Você não definiu uma biografia...</p>
                    )}
                    
                </div>
            </div>


            </div>
            <hr />
            <nav className={menuMob ? styles.mobMenu : styles.links}>
                <ul className={menuMob ? styles.mobListLinks : styles.listLinks}>
                    <li onClick={handleOpenMyPosts}>
                        <button>
                            <i class="bi bi-card-list"></i>
                            Minhas postagens
                        </button>
                    </li>
                    <li>
                        <button onClick={handleOpenSaves}>
                            <i class="bi bi-bookmarks"></i>
                            Postagens Salvas
                        </button>
                    </li>
                    <li onClick={handleOpenSettings}>
                        <button>
                            <i class="bi bi-gear"></i>
                            Configurações
                        </button>
                    </li>
                    <li onClick={handleOpenStudies}>
                        <button>
                            <i class="bi bi-journal-check"></i>
                            Meus estudos
                        </button>
                    </li>
                    
                </ul>
            </nav>

            <div onClick={() => {
                setMenuMob(!menuMob);

            }} className={styles.menuMob}>
                <i class="bi bi-filter"></i>
            </div>

            {/* Componente de postagens do usuário */}
            {openMyPosts && <MyPosts userId={userId} />}

            {/* Componente de configurações */}
            {openSettings && <Settings dataUser={data} userId={userId} />}

            {/* Componente de postagens salvas */}
            {openSaves && <PostsSaved userId={userId} />}

            {/* Componente de estudos */}
            {openStudies && <MyStudies userId={userId} /> }
        </>
        ) : (
            <div class="spinner-grow text-primary d-flex justify-content-center" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )}
        <hr />

        <div className={orgs ? 'd-flex w-100' : 'd-none'}>
            <OrgStudies dNone={true} />
        </div>
        

    </div>
  )
}

export default Profile