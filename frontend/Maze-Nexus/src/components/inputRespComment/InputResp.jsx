import { useEffect, useState } from 'react'
import styles from './InputResp.module.css'
import { jwtDecode } from 'jwt-decode'

const InputResp = ({commentId, commentAuthor}) => {

  //Pegando dados do usuário logado e que fez o comentário
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  const userId = decode.id

  const [response, setResponse] = useState("")
  const [responses, setNewResponses] = useState([])
  const [newRes, setNewRes] = useState("")
  const [loading, setLoading] = useState(false)
  const [idRes, setIdRes] = useState(null)
  const [openEdit, setOpenEdit] = useState(false)

  const url = `https://maze-nexus.onrender.com/user/comment/${commentId}/response`


  const handleResp = async (e) => {
    e.preventDefault()
    if(!response.trim()) return
    
    setLoading(true)
    try{
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ userId, response })
      })

      const dataJson = await res.json()
      console.log(dataJson)
      if(dataJson.ok){
        setLoading(false)
        setResponse("")
        fetchData()
        setNewResponses((prev) => [...prev, dataJson.newResponse])
        console.log(dataJson.newResponse._id)
      }
    }
    catch(error){
      setLoading(false)
      console.log(error)
    }
  }

  //Função para buscar respostas
  const urlSearch = `https://maze-nexus.onrender.com/user/comment/${commentId}/responses`
    const fetchData = async () => {
      try{

        const res = await fetch(urlSearch)

        const dataJson = await res.json()

        setNewResponses(dataJson.newResponse || [])
      }
      catch(error){
        console.log(error)
      }
    }

  useEffect(() => {
    fetchData()
  }, [commentId])

  //Função para deletar respostas
  const handleDeleteRes = async (respId) => {

    const urlDelete = `https://maze-nexus.onrender.com/comment/${commentId}/response/${respId}` 

    try{
      const res = await fetch(urlDelete, {
        method: 'DELETE',
      })
  
      const dataJson = await res.json()
      fetchData()
      console.log(dataJson)
    }
    catch(error){
      console.log(error)
    } 
  }

  //Função para abrir form de edição de comentário

  const hendleOpenEdit = (openEdit) => {
    setOpenEdit(!openEdit)
  }


  //Função para editar respostas
  const handleEditRes = async (e) => {
    e.preventDefault()
    console.log(idRes)

    if(!newRes.trim()) return

    try{

      const res = await fetch(`https://maze-nexus.onrender.com/user/response/${idRes}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ newRes })
      })

      const dataJson = await res.json()
      if(dataJson.ok){
        setNewRes("")
        setOpenEdit(false)
        setIdRes(null)
        fetchData()
        console.log(dataJson)
      }
    } 
    catch(error){
      console.log(error)
    }
    
  }

  return (
    <>
    <hr />
      <h5>Respostas:</h5>
      <div className={responses.length > 0 
      ? `${styles.contentResps} w-100` 
      : `${ styles.noComments }`}>

        {/* Informando as respostas ao usuário */}
        {responses.length > 0 ? ((
          responses.map((resp, index) => (
            <div className={styles.localResp} key={index}>
              <div className={styles.toolResponses}>
                <span>
                  <strong>{resp.userId.username || resp.userId.name}: </strong>
                </span>

                {/* Ferramentas de respostas */}
                {resp.userId._id === userId 
                ?
                  <>
                    <span className={styles.toolsRes}>
                      {/* Apagar respostas */}
                      <div className={styles.localIcons}>
                        <button onClick={() => handleDeleteRes(resp._id)}>
                          <i class="bi bi-trash"></i>
                        </button>


                        {/* Editar respostas */}
                        <button
                        onClick={() => {
                          setIdRes((prevIdRes) => {
                            const newIdRes = prevIdRes === resp._id ? null : resp._id;
                            setOpenEdit(newIdRes !== null);
                            
                            if (newIdRes) {
                              setNewRes(resp.response); // Preenche o input com o valor correto da resposta
                            }
                        
                            return newIdRes;
                          });
                        }}>

                          <i class="bi bi-pencil"></i>
                        </button>
                      </div>

                      {/* Formulário de edição de respostas */}
                      {idRes === resp._id && (
                        <form onSubmit={handleEditRes} 
                        className={openEdit 
                        ? `${styles.formEditRes} d-flex` 
                        : `d-none`}>

                          <button type='submit'>
                            <i class="bi bi-check-circle"></i>
                          </button>
                          <button onClick={() => setOpenEdit(null)} className={styles.closeEdit}>
                            <i class="bi bi-x-circle"></i>
                          </button>
                          
                          <input type="text" 
                          onChange={(e) => setNewRes(e.target.value)} 
                          value={newRes} 
                          
                          />
                        </form>
                      )}
                    </span>
                  </>
                :
                  <i class="bi bi-flag"></i>
                }
              </div>
              <span>{resp.response}</span>

              <hr />
            </div>
          ))
        )):(
          <><p>Sem respostas por aqui...</p></>
        )}
        
          <form onSubmit={handleResp}
          className={`${styles.inputResp} w-100 d-flex`}>
              <input 
              onChange={(e) => {setResponse(e.target.value)}}
              type="text" 
              value={response} 
              placeholder={`Responder ${commentAuthor.username || commentAuthor.name}`}/>

              <button type='submit'>
                  <i class="bi bi-send"></i>
              </button>
          </form>
      </div>
    </>
  )
}

export default InputResp