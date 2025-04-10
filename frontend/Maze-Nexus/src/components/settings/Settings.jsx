import { useContext, useState } from 'react'
import styles from './Settings.module.css'
import { ThemeContext } from '../../contexts/ThemeContext'

const Settings = ({userId, dataUser}) => {

    const [newDataName, setNewDataName] = useState(dataUser.name)
    const [newDataBio, setNewDataBio] = useState(dataUser.bio)
    const [success, setSuccess] = useState("")
    const [theme, setTheme] = useState(false)

    const { themeSelect, setThemeSelect } = useContext(ThemeContext)

    const handleData =  async (e) => {
        try{
            e.preventDefault()
        
            const res = await fetch(`https://maze-nexus.onrender.com/user/edit/profile/${userId}`, {
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

    //toggle dark/light
    const handleTheme = () => {
        setTheme(!theme)
        setThemeSelect(theme ? "dark": "light")
        localStorage.setItem("Theme", themeSelect)
    }

  return (
    <div className={styles.formData}>
        <h4 className='mt-4'>Configurações: </h4>
        <hr />
        
        <div className='mb-3 '>
            <h4>Tema:</h4>
            
            <button onClick={handleTheme} className='btn d-flex gap-2 btn-dark'>
               {theme 
                ?
                <>
                    Escuro
                    <i class="bi bi-moon-stars-fill"></i>
                </>
                :
                <>
                    Claro
                    <i class="bi bi-cloud-sun-fill"></i>
                </>
                }
                
            </button>
            
        
            
            
        </div>

        <div className={styles.contentData}>
            <div className='d-flex justify-content-center mb-3'>
                {success && <span className='successMessage'>{success}</span>}
            </div>
            

            {/* Formulário para modificação de dados */}
            <form onSubmit={handleData} className='styleDark'>
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