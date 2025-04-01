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
    
    const {user, logout} = useContext(AuthContext)

    return(
        <nav className={user ? styles.navbar : styles.navbarLC}>
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
                        {/* <li>
                            <NavLink to="/about">Sobre</NavLink>
                        </li> */}
                        
                        <li className={styles.profile}>
                            <NavLink to={`/profile/${userId}`}>
                                <i class="bi bi-person-circle"></i>
                            </NavLink>
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