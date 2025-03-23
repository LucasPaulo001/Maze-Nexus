import '../Login_register.css'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useState } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const url = 'http://localhost:1526/user/google-login'

function Login(){
    

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Função de submit do formulário de login
    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     try{
    //         const res = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({email, password})
    //         })

    //         const data = await res.json()
    //         console.log(data)
    //     }
    //     catch{
    //         console.log('Erro ao processar login1')
    //     }
    // }

    //Login com o google
    const handleSuccess = async (response) => {
        console.log(response)
        console.log("Login bem-sucedido:", response)
        console.log("Token JWT recebido:", response.credential)

        const token = response.credential

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ token })
        })

        const data = await res.json();
        console.log("Resposta do backend:", data);

        if (data.user) {
            window.opener.postMessage(data, "*");  // Forçar a comunicação entre janelas
        }

    }

    const handleFailure = (error) => {
        console.log("Erro no login:", error);
    }

    return(
        <>    
            <div className='loginContent'>
                <h1 className={styles.title}>Fazer Login</h1>
                <form  id='formData' action="" method="post">
                    <div className='localInput'>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name='email' placeholder='Informe seu email...' 
                        onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                    <div className='localInput'>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" name='password' placeholder='Informe sua senha...' 
                        onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className='btns'>
                        <button className='btn'>Login</button>
                        <Link to="/register"><button className='btn'>Cadastro</button></Link>
                    </div>
                </form>

                <GoogleOAuthProvider clientId={clientId}>
                    <GoogleLogin 
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    />
                </GoogleOAuthProvider>
            </div>
        </>
    )
}

export default Login