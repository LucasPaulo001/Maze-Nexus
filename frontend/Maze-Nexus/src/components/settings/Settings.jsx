import { useState } from 'react'
import styles from './Settings.module.css'

const Settings = ({userId, dataUser}) => {

    const [newDataName, setNewDataName] = useState(dataUser.name)
    const [newDataBio, setNewDataBio] = useState(dataUser.bio)
    const [success, setSuccess] = useState("")

    const handleData =  async (e) => {
        try{
            e.preventDefault()
        
            const res = await fetch(`http://localhost:1526/user/edit/profile/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ bioData: newDataBio, username: newDataName })
            })

            const resJson = await res.json()
            if(resJson.ok){
                setSuccess("Dado(s) modificado(s) com successo!")
                console.log(resJson)
                setNewDataBio(resJson.bioData)
                setNewDataName(resJson.username)
                setTimeout(() => {
                    setSuccess("")
                }, 2000)
            }
        }
        catch(error){
            setSuccess("")
            console.log(error)
        }
    }

  return (
    <div className={styles.formData}>
        <h4 className='mt-4'>Configurações: </h4>
        <hr />
        <div className={styles.contentData}>
            <div className='d-flex justify-content-center mb-3'>
                {success && <span className='successMessage'>{success}</span>}
            </div>
            

            {/* Formulário para modificação de dados */}
            <form onSubmit={handleData}>
                <h4>Modificar dados:</h4>

                <div className='mb-3 mt-4'>

                <label htmlFor="username">
                    <strong>Nome de usuário:</strong>
                </label>
                <input type="text" 
                value={newDataName}
                onChange={(e) => {setNewDataName(e.target.value)}}
                />

                </div>

                <div className='mb-3'>

                    <label htmlFor="bio">
                        <strong>Biografia:</strong>
                    </label>
                    <textarea 
                    placeholder='Fale sobre você...' 
                    className='textarea' 
                    id="bio"
                    value={newDataBio}
                   
                    onChange={(e) => { setNewDataBio(e.target.value) }}
                    ></textarea>
                </div>

                <div className='d-flex justify-content-center'>
                    <button type='submit' className='btn btn-success'>
                        Salvar
                    </button>
                </div>
            </form>
        </div> 
    </div>
  )
}

export default Settings