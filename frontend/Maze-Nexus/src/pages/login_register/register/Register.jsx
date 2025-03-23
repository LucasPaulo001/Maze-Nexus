import '../Login_register.css'
import { Link } from 'react-router-dom'
import styles from './Register.module.css'

function Register(){
    return(
        <>
            <div className='loginContent'>
                <h1>Faça seu cadastro</h1>
                <form id='formData' action="" method="post">
                    <div className='localInput'>
                        <label htmlFor="name">Nome Completo:</label>
                        <input type="text" name='name' placeholder='Informe seu nome...' />
                    </div>
                    <div className='localInput'>
                        <label htmlFor="username">Nome de usuário:</label>
                        <input type="text" name='username' placeholder='Informe seu nome de usuário...' />
                    </div>
                    <div className='localInput'>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name='email' placeholder='Informe seu email...' />
                    </div>
                    <div className='localInput'>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" name='password' placeholder='Informe sua senha...' />
                    </div>
                    <div className='localInput'>
                        <label htmlFor="password">Repita a senha:</label>
                        <input type="password" name='password' placeholder='Informe sua senha...' />
                    </div>
                    <div className='btns'>
                    <button className='btn'>Fazer cadastro</button>
                    <Link to="/login"><button className='btn'>Login</button></Link> 
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register