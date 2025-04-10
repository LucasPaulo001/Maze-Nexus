import { useState } from "react"
import styles from './EditComment.module.css'


const EditComment = ({postId, commentId, setOpen, isOpen, commentValue}) => {

    //const [value, setValue] = useState(commentValue)
    const [value, setValue] = useState(commentValue)
    const [success, setSuccess] = useState("")
    //console.log(isEditd)

    const handleClose = () => {
        setOpen(!isOpen)
    }

    const url = `https://maze-nexus.onrender.com/user/comment/${commentId}`

    //Função para editar comentário
      const handleEditComment = async (e) => {
        e.preventDefault()

        if(!value.trim()) return

        try{
          const res = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ newComment: value })
          })
      
          const resJson = await res.json()
          if(resJson.ok){
            setSuccess("Mensagem editada com sucesso!")
            console.log(resJson)
            setTimeout(() => {
                setSuccess("")
                setOpen(false)
            }, 900)
          }
        }
        catch(error){
          console.log(error)
        }
      }
   
  return (
    <div className={`${styles.editComment} edit`}>
        {success && <div className="successMessage">{success}</div>}
        <div className={styles.close}>
            <i onClick={handleClose} class="bi bi-x-circle"></i>
        </div>
        <form onSubmit={handleEditComment}>
            <textarea className="textarea" placeholder="Edite seu comentário..."
            onChange={(e) => {setValue(e.target.value)}}
            value={value} >
            </textarea>
            <button type="submit" className='btn btnPost btn-outline-success'>Salvar</button>
        </form>
    </div>
  )
}

export default EditComment