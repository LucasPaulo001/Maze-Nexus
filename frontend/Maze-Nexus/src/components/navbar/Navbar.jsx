import './Navbar.css'
import { Link } from "react-router-dom"

function Navbar(){
    return(
        <nav>
            <Link to="/login">Login/Cadastro</Link>
        </nav>
    )
}

export default Navbar