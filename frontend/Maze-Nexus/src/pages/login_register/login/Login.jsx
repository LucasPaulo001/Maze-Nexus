import '../Login_register.css'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'

function Login(){
    return(
        <>    
            <div className='loginContent'>
                <h1 className={styles.title}>Fazer Login</h1>
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
                        <button className='btn'>Login</button>
                        <Link to="/register"><button className='btn'>Cadastro</button></Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login