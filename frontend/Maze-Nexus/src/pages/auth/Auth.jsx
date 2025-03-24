import { useState } from "react"
import styles from './Auth.module.css'
import '../../App.css'
import { Link } from "react-router-dom"

function Auth(){
    const [code, setCode] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(code)
    }

    return(
        <>
            <div className={styles.localFormCode}>
                <form className={styles.formInsert} onSubmit={handleSubmit} action="" method="post">
                    <div className={styles.localInput}>
                        <label htmlFor="code">Código de verificação</label>
                        <input type="text"
                        placeholder="Insira o código enviado no seu E-mail..."
                        onChange={(e) => {setCode(e.target.value)}}
                        />
                    </div>
                    <div className={styles.localBtn}>
                        <button className="btnVerifyCode" type="submit">Verificar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Auth