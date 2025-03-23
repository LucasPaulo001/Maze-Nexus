import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom"

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <span>
                <NavLink 
                to="/"
                className={({ isActive }) => 
                `${styles.navLink} ${(isActive ? styles.activeLink : styles.inactivesLink)}`}>
                    Maze Nexus
                </NavLink>
            </span>
            <ul className={styles.linkList}>
                <li>
                    <NavLink to="/">Início</NavLink>
                </li>
                <li>
                    <NavLink to="/about">Sobre</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login/Cadastro</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar