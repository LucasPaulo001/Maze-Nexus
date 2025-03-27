import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"

function Navbar(){
    const [loading, setLoading] = useState(false)
    const {user, logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const handlelogout = () => {
        setLoading(true)

        setInterval(() => {
            logout()
            navigate('/login')
        }, 900)
        
    }

    return(
        <nav className={user ? styles.navbar : styles.navbarLC}>
            <span>
                <NavLink 
                to="/"
                className={({ isActive }) => 
                `${styles.navLink} ${(isActive ? styles.activeLink : styles.inactivesLink)}`}>
                    <span className='textLogo'>Maze Nexus</span>
                </NavLink>
            </span>
            <ul className={styles.linkList}>
                {user ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <i class="bi bi-house-door-fill"></i>
                                <small>Início</small>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/notifications">
                                <i class="bi bi-bell-fill"></i>
                                <small>Notificações</small>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">Sobre</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Perfil</NavLink>
                        </li>
                        <li>
                            <button className={styles.logout} onClick={handlelogout}>
                                {loading ? (
                                    <>
                                    Saindo...
                                    <div className="spinner-grow text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    </>
                                ) : (
                                    "Sair"
                                )}
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/about">Sobre</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login/Cadastro</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar