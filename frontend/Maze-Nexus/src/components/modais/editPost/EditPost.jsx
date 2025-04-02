import { PostContext } from '../../../contexts/PostsContext'
import styles from './EditPost.module.css'
import { useContext, useState } from 'react'

const EditPost = ({postEdit, isClose, setClose}) => {
    const [newTitle, setNewTitle] = useState(postEdit.title)
    const [newContent, setNewContent] = useState(postEdit.content)
    const { success, error, editPost } = useContext(PostContext)

    // const url = `http://localhost:1526/user/update/post/${postEdit._id}`
    // const handleEdit = async (e) => {
    //     e.preventDefault()

    //     try{
    //         const fetchData = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({ title: newTitle, content: newContent })
    //         })
            
    //         const json = await fetchData.json()
    //         if(json.ok){
    //             setError("")
    //             setSuccess("Postagem editada com sucesso!")
    //             addNewPost(json.attPost, true)

    //             setTimeout(() => {
    //                 setClose(false)
    //             }, 900)
                
    //         }
    //     }
    //     catch(error){
    //         setError("Erro ao editar postagem, tente novamente mais tarde!")
    //         console.log(error)
    //     }
    // }

    const handleClose = () => {
        setClose(false)
    }

  return (
    <div className={isClose ? "windowEdit" : "windowEditClose"}>
        <div className={"edit"}>
            {success && <div className='successMessage'>{success}</div>}
            {error && <div className='errorMessage'>{error}</div>}
            <div className={"close"}>
                <i onClick={handleClose} class="bi bi-x-circle"></i>
            </div>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    editPost(postEdit._id, { 
                        title: newTitle, 
                        content: newContent 
                    })}}>

                    <div>
                        <input type="text" 
                        value={newTitle} 
                        onChange={(e) => {setNewTitle(e.target.value)}}
                        placeholder='Título *opcional'
                        />
                    </div>  
                    <div>
                        <textarea className='textarea'
                        value={newContent}
                        onChange={(e) => {setNewContent(e.target.value)}}
                        >

                        </textarea>
                    </div>
                    <button type='submit' className='btn btnPost btn-outline-success'>Salvar</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default EditPost