import '../Login_register.css'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useContext, useState, useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'

//Imagens
import imgLogin from '../../../../public/images/loginPage.png'

const urlLoginGoogle = 'http://localhost:1526/user/google-login'
const urlLoginCommom = 'http://localhost:1526/user/login'

function Login(){
    
    let navigate = useNavigate()
    const { user, login } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    useEffect(() => {
        if (user?.token) {
            navigate('/')
        }
    }, [user, navigate])

    //Função de submit do formulário de login
    const handleLogin = async (e) => {
        e.preventDefault()

        try{
            const res = await fetch(urlLoginCommom, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })

            const data = await res.json()
            console.log(data)
            if(!data.ok){
                setError(data.message)
                console.log(error)
                return
            }
            
            //Armazenando token no localstorage
            localStorage.setItem("token", data.token)

            login(data.token)

            navigate('/')
        }
        catch{
            setError("Erro ao conectar com o servidor!")
            console.log('Erro ao processar login1')
        }
    }

    //Login com o google
    const handleSuccess = async (response) => {
        console.log(response)
        console.log("Login bem-sucedido:", response)
        console.log("Token JWT recebido:", response.credential)

        const token = response.credential

        const res = await fetch(urlLoginGoogle, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ credential: token })
        })

        const data = await res.json();
        console.log("Resposta do backend:", data);
        console.log("Valor de data.success:", data.success);
        if(data.success === true){
            //Armazenando token no localstorage
            localStorage.setItem("token", data.token)

            //Atualizando o estado do usuário no contexto
            login(data.token)

            //Redireciona para a página inicial após o login
            navigate('/')
        }
        if (data.user) {
            window.opener.postMessage(data, "*")
        }

    }

    const handleFailure = (error) => {
        console.log("Erro no login:", error);
    }

    return(
        <>    
            <div className="background">
                <div className='loginContent'>
                    <div>
                        <h1 className={styles.title}>Fazer Login</h1>
                        {error &&
                            <div className='d-flex justify-content-center'>
                                <div className="errorMessage">
                                    {error}
                                </div>
                            </div>
                        }
                    </div>
                
                    <form onSubmit={handleLogin} id='formData' action="" method="post">
                        <div className='localInput'>
                            <label htmlFor="email">E-mail:</label>
                            <div className='input-icon'>
                                <i class="bi bi-envelope"></i>
                                <input type="email" name='email' placeholder='Informe seu email...'
                                onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className='localInput'>
                            <label htmlFor="password">Senha:</label>

                            <div className='input-icon'>
                                <i class="bi bi-lock"></i>
                                <input type="password" name='password' placeholder='Informe sua senha...'
                                onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className='btns'>
                            <button className='btn'>Login</button>
                            <Link to="/register"><button className='btn'>Cadastro</button></Link>
                        </div>
                    </form>
                    <div className={styles.divider}>
                        <span>ou</span>
                    </div>
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleFailure}
                        />
                    </GoogleOAuthProvider>
                </div>
                <div className={styles.localImage}>
                    <h3>Conecte-se, ensine e aprenda!</h3>
                    <img src={imgLogin} alt="" />
                </div>
            </div>
        </>
    )
}

export default Login