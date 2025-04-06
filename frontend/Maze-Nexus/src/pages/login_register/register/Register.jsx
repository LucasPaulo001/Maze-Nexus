import '../Login_register.css'
import { data, Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { useState } from 'react'

const url = 'https://maze-nexus.onrender.com/user/register'
const urlCheckName = 'https://maze-nexus.onrender.com/user/checkName'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [dateBirth, setDateBirth] = useState("")
    const [password, setPassword] = useState("")
    const [passReap, setPassReap] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [isChecking, setIsChecking] = useState(false)
    const [usernamAvailable, setUsernameAvailable] = useState("")
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null)

    //Função de submit para os dados do formulário

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Validações dos dados do formulário
        if(!name || !username || !email || !dateBirth){
            setErrorMsg("Preencha todos os campos!")
            return 
        }

        if (password.length < 6) {
            setErrorMsg("A senha deve conter no mínimo 6 caracteres.")
            return
        }
        if(isUsernameAvailable == null){
            setErrorMsg("Verifique o seu nome de usuário!")
            return
        }
    
        if (password !== passReap) {
            setErrorMsg("As senhas não coincidem.")
            return
        }

        //Envio dos dados para a api
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ name, username, email, dateBirth, password })
            })

            const data = await res.json()

            if (res.ok) {
                setSuccessMsg("Cadastrado realizado com sucesso!")
                setErrorMsg("")
                setName("")
                setUsername("")
                setEmail("")
                setDateBirth("")
                setPassword("")
                setPassReap("")
                
                // Aqui, pegamos o token gerado pelo backend (caso ele tenha retornado com sucesso)
                const token = data.tokenVerification; // Supondo que o backend retorne o token
                console.log(token)

                if (token) {
                // Redirecionando para a página de verificação, passando o token na URL
                navigate(`/verify/${token}`);
                }
            } else {
                setErrorMsg(data.message || "Erro ao cadastrar usuário!")
            }
        } catch (error) {
            setErrorMsg("Erro ao se comunicar com o servidor.")
        }
    }

    // Função para verificar se o username do usuário já consta no banco de dados

    const checkUsername = async () => {
        if(!username.trim()){
            return
        }

        setIsChecking(true)
        setTimeout( async () => {
            try{
                const res = await fetch(urlCheckName, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({username})
                })
                const data = await res.json()
                console.log(data.available)
                if(data.available){
                    setIsUsernameAvailable(true)
                    setUsernameAvailable("Nome disponível!")
                }
                else{
                    setIsUsernameAvailable(false)
                    setUsernameAvailable("Nome já está em uso!")
                }
            }
            catch{
                setIsUsernameAvailable(false)
                console.log('Erro ao verificar nome de usuário')
            }
            finally{
                setIsChecking(false)
            }
        }, 1000)
        
    }


    return (
        <>
            <div className="background">
                <div className='loginContent'>
                    <h1>Faça seu cadastro</h1>
                    {/* Formulário de cadastro */}
                    <form onSubmit={handleSubmit} id='formData'>
                        {/* Nome completo */}
                        <div className='localInput'>
                            <label htmlFor="name">Nome Completo:</label>

                            <div className='input-icon'>
                                <i class="bi bi-person"></i>
                                <input type="text" name='name' placeholder='Informe seu nome...' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        {/* Nome de usuário */}
                        <div className='localInput'>
                            <div>
                                <label htmlFor="username">Nome de usuário:</label>
                                <div className='input-verify'>
                                    {/* Input de username e botão de verificação */}
                
                                    <div className='input-icon'>

                                        <i class="bi bi-person-badge"></i>
                                        <input type="text" name='username' placeholder='Informe seu nome de usuário...' value={username}
                                        onChange={
                                            (e) => setUsername(e.target.value)
                                        } />
                                    </div>
                                    {/* Botão de verificação */}
                                    <button className={`btn ${styles.btnVerify}`} type='button' onClick={checkUsername} disabled={isChecking}>
                                        {isChecking ?
                                        <div className="spinner-grow text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> :
                                        <div className='d-flex text-dark btnNoChecking align-items-center gap-2'>
                                            <i className="bi bi-person-check"></i> <small>Verificar</small>
                                        </div>}
                                    </button>
                                </div>
                            </div>
                            <small className = {isUsernameAvailable === true ? "ok" : isUsernameAvailable === false ? "noOk" : ""}>   {usernamAvailable}
                            </small>
                        </div>
                        <div className='localInput'>
                            <label htmlFor="email">E-mail:</label>

                            <div className='input-icon'>
                                <i class="bi bi-envelope"></i>
                                <input type="email" name='email' placeholder='Informe seu email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className='localInput'>
                            <label htmlFor="dateBirth">Data de nascimento:</label>
                            <div className='input-icon'>
                                <i class="bi bi-calendar"></i>
                                <input type="date" name='dateBirth' value={dateBirth} onChange={(e) => setDateBirth(e.target.value)} />
                            </div>
                        </div>
                        <div className='localInput'>
                            <label htmlFor="password">Senha:</label>
                            <div className='input-icon'>

                                <i class="bi bi-lock"></i>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder='Informe sua senha...'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={password.length > 0 && password.length < 6 ? "error" : ""}
                                />
                            </div>
                            {password.length > 0 && password.length < 6 && <small className="error">A senha deve conter no mínimo 6 caracteres.</small>}
                        </div>
                        <div className='localInput'>
                            <label htmlFor="passReap">Repita a senha:</label>
                            <div className='input-icon'>
                                <i class="bi bi-lock"></i>
                                <input
                                    type="password"
                                    name='passReap'
                                    placeholder='Informe sua senha...'
                                    value={passReap}
                                    onChange={(e) => setPassReap(e.target.value)}
                                    className={passReap.length > 0 && passReap !== password ? "error" : ""}
                                />
                            </div>
                            {passReap.length > 0 && passReap !== password && <small className="error">As senhas não coincidem.</small>}
                        </div>
                        <div className='btns'>
                        <button className='btn'>Fazer cadastro</button>
                        <Link to="/login"><button className='btn'>Login</button></Link>
                        </div>
                    </form>
                    {/* Mensagens de erro e sucesso */}
                    {errorMsg && <div className="errorMessage">{errorMsg}</div>}
                    {successMsg && <div className="successMessage">{successMsg}</div>}
                </div>
            </div>
        </>
    )
}

export default Register
