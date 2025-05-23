import { PostContext } from '../../../contexts/PostsContext'
import styles from './EditPost.module.css'
import { useContext, useState } from 'react'

const EditPost = ({postEdit, isClose, setClose}) => {
    const [newTitle, setNewTitle] = useState(postEdit.title)
    const [newContent, setNewContent] = useState(postEdit.content)
    const { success, error, editPost } = useContext(PostContext)

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