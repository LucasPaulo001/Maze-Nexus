import { useContext, useState } from "react"
import { ProfileContext } from "../../../contexts/ProfileContext"
import styles from './Notes.module.css'


const Notes = () => {
  const { notes, loading } = useContext(ProfileContext)

  return (
    <div>
        <hr />
          <h4 className="text-center">Minhas anotações</h4>
          <hr />
          {/* Buscar anotações */}  
          <div className={`${styles.localSearch} mt-4`}>
            <div className={`${styles.localInput} mb-3 localInputDark`}>
              <i class="bi bi-search"></i>
              <input type="text" placeholder="Buscar anotação..." />
            </div>
          </div>
          
          {loading 
          ?(
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          ):(
            <div className={styles.content}>
              { notes.length > 0
              ?(notes.map((note) => (
                <div key={note._id} className={`${styles.card} card`}>
                  <div className={`${styles.noteDetail} noteDetailDark`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={`${styles.bodyCard} card-body`}>
                    <div className={styles.icon}>
                      <i class="bi bi-bookmark"></i>
                    </div>
                    <h5 className="card-title">Anotação de {note?.subject || 'Matéria'}</h5>
                    <hr />
                    <p className="card-text">{note?.notes}</p>
                  </div>
                </div>
              )))
              : <span>Nenhuma anotação</span> }
            </div>
          ) 
          }
    </div>
  )
}

export default Notes