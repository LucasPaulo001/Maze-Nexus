import { useState } from 'react'
import styles from './MyStudies.module.css'
import { BiBook, BiClipboard, BiNote } from "react-icons/bi"
import OrgStudies from './orgStudies/OrgStudies'
import FlashCards from './flashCards/FlashCards'
import Notes from './notes/Notes'

const MyStudies = () => {
    const [orgStudies, setOrgStudies] = useState(null)
    const [fleshCards, setFlashCards] = useState(null)
    const [notes, setNotes] = useState(null)

    const handleOpenOrgStudies = () => {
        setOrgStudies(!orgStudies)
        setFlashCards(false)
        setNotes(false)
    }

    const handleOpenCards = () => {
        setFlashCards(!fleshCards)
        setOrgStudies(false)
        setNotes(false)
    }

    const handleNotes = () => {
        setNotes(!notes)
        setFlashCards(false)
        setOrgStudies(false)
    }

  return (
    <div className={styles.studies}>
        <h4 className='mt-4'>Meus estudos</h4>

        {/* Cards clicáveis */}
        <div className={styles.cardsContent}>
            <div className={`${styles.localCard} localCardDark`}>
                <button onClick={handleOpenOrgStudies} className={styles.card}>
                    <span>Organização de Estudos</span>
                    <BiBook className={styles.icon} size={40} />
                </button>
            </div>
            <div className={`${styles.localCard} localCardDark`}>
                <button onClick={handleOpenCards} className={styles.card}>
                    <span>FlashCards</span>
                    <BiClipboard className={styles.icon} size={40} />
                </button>
            </div>
            <div className={`${styles.localCard} localCardDark`}>
                <button onClick={handleNotes} className={styles.card}>
                    <span>Anotações</span>
                    <BiNote className={styles.icon} size={40} />
                </button>
                
            </div>
            
        </div>
        {/* Componentes para Anotações */}
        {notes && <Notes />}

        {/* Componentes para flashCards */}
        {fleshCards && <FlashCards />}

        {/* Componentes para as abas */}
        {orgStudies && <OrgStudies />}

    </div>
  )
}

export default MyStudies