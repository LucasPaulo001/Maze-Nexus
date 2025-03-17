import '../Login_register.css'
import { Link } from 'react-router-dom'

function Login(){
    return(
        <>
            <div className='loginContent'>
                <form id='formData' action="" method="post">
                    <div className='localInput'>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name='email' placeholder='Informe seu email...' />
                    </div>
                    <div className='localInput'>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" name='password' placeholder='Informe sua senha...' />
                    </div>
                    <div className='btns'>
                        <button className='btnAction'>Login</button>
                        <Link className='btnAction' to="/register"><button>Cadastro</button></Link> 
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login