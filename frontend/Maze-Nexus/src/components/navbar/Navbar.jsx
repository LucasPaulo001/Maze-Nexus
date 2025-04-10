import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'

function Navbar(){
    //Dados do usuário logado
    const token = localStorage.getItem("token")
    let userId = null
    if(token){
        try{
            const decode = jwtDecode(token)
            userId = decode.id
        }
        catch(error){
            console.log(error)
            localStorage.removeItem("token")
        }
    }

    const [menuMob, setMenuMob] = useState(false)
    
    const {user} = useContext(AuthContext)

    return(
        <nav className={`${user ? styles.navbar : styles.navbarLC} navbar`}>
            {/* Logo */}
            <span>
                <NavLink 
                to="/"
                className={({ isActive }) => 
                `${styles.navLink} ${(isActive ? styles.activeLink : styles.inactivesLink)}`}>
                    <span className='textLogo'>Maze Nexus</span>
                </NavLink>
            </span>
            {/* Links do navbar */}
            <div onClick={() => setMenuMob(!menuMob)} className='menuMob'>
                <i class="bi bi-list"></i>
            </div>
            <ul className={menuMob ? `${styles.linkListMob} linkListMob`: `${styles.linkList}`}>
                <div onClick={() => setMenuMob(false)} className={menuMob ?`d-flex ${styles.iconClose}` : 'd-none'}>
                    <i class="bi bi-x-circle"></i>
                </div>
                    <> 
                        {user ? (
                            <>
                                <li>
                                    <NavLink onClick={() => setMenuMob(false)} to="/">
                                        <i class="bi bi-house-door-fill"></i>
                                        <small>Início</small>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={() => setMenuMob(false)} to="/notifications">
                                        <i class="bi bi-bell-fill"></i>
                                        <small>Notificações</small>
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/about">Sobre</NavLink>
                                </li> */}
                                
                                <li className={styles.profile}>
                                    <NavLink onClick={() => setMenuMob(false)} to={`/profile/${userId}`}>
                                        <i class="bi bi-person-circle"></i>
                                        <small>Perfil</small>
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink onClick={() => setMenuMob(false)} to="/about">Sobre</NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={() => setMenuMob(false)} to="/login">Login/Cadastro</NavLink>
                                </li>
                        </> 
                        )}
                    </>
                    
                 
            
            </ul>
        </nav>
    )
}

export default Navbar