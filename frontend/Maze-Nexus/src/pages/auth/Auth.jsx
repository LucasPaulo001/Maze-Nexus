import { useState } from "react"
import './Auth.css'
import { Link } from "react-router-dom"

function Auth(){
    const [code, setCode] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(code)
    }

    return(
        <>
            <div className="local-form-code">
                <form className="form-insert" onSubmit={handleSubmit} action="" method="post">
                    <div className="localInput">
                        <label htmlFor="code">Código de verificação</label>
                        <input type="text"
                        onChange={(e) => {setCode(e.target.value)}}
                        />
                    </div>
                    <div>
                        <button type="submit">Verificar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Auth