import { useEffect, useState } from "react"
import styles from './Auth.module.css'
import '../../App.css'
import { Link } from "react-router-dom"
import OTPinput from "./otpInput/OTPinput"
import { useNavigate } from "react-router-dom"
const urlVerify = 'http://localhost:1526/user/verifyCode'

function Auth(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleOtpComplete = async (otp) => {
        console.log("Código inserido:", otp);
        
        setLoading(true)
        try{
            setError("")
            setSuccess("")
            const res = await fetch(urlVerify, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({otpValue: otp})
            })
    
            const dataJson = await res.json()
            
            if(dataJson.ok){
                setTimeout(() => {
                    setError("")
                    setSuccess("Validado com sucesso! redirecionando...")
                    setLoading(false)
                }, 3000)
                
                setTimeout(() => {
                    navigate('/login')
                }, 5000)
            }
            else{
                setTimeout(() => {
                    setSuccess("")
                    setError("Código de verificação incorreto!")
                    setLoading(false)
                }, 900)
                
            }
            console.log(dataJson)
        }
        catch (error){
            setLoading(false)
            setError("Erro interno do servidor, tente novamente mais tarde!")
            console.log(error)
        }
        
    }

    return(
        
        <div className={styles.localFormCode}>
            {error && <div className="errorMessage">{error}</div>}
            {success && <div className="successMessage">{success}</div>}
            <h4>Enviamos um código de verificação para você via E-mail</h4>
            <p>Digite para validar sua conta!</p>
            <div className={styles.localOtp}>
                <OTPinput length={4} onComplete={handleOtpComplete} />
            </div>
            {loading && (
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
        
    )
}

export default Auth