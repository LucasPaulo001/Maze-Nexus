import { useEffect, useState } from 'react'
import styles from './OrgStudies.module.css'
import { jwtDecode } from 'jwt-decode'


const OrgStudies = ({dNone}) => {
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  const userId = decode.id

  const url = `http://localhost:1526/user/profile/studies/${userId}`

  const [schedule, setSchedule] = useState([])
  const [newStudy, setNewStudy] = useState({
    subject: "",
    day: "Segunda-feira",
    startTime: "",
    endTime: "",
    reminder: false
  })

  //Buscando dados
  
    const dataFetch = async () => {
      try{
        const res = await fetch(url)

        const data = await res.json()

        if(res.ok){
          setSchedule(data.studies.schedule)
          console.log(data.studies.schedule)
        }
      }
      catch(error){
        console.log(error)
      }
    }
  useEffect(() => {
    dataFetch()
  }, [userId])

  //Função para criar horário
  const handleCreate = async (e) => {
    e.preventDefault()

    try{
      const res = await fetch(`http://localhost:1526/user/profile/studies/${userId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify( {newStudy} )
      })

      const data = await res.json()

      if(res.ok){
        console.log(data)
        setSchedule((prev) => [...prev, newStudy])
        setNewStudy({
          subject: "",
          day: "Segunda-feira",
          startTime: "",
          endTime: "",
          reminder: false
        })
      }
    }
    catch(error){
      console.log(error)
    }
  }

  //Função para remover matéria
  const handleDelete = async (id) => {
    try{
      const res = await fetch(`http://localhost:1526/user/profile/${userId}/deleteStudy/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })

      const resJson = await res.json()
  
      if(res.ok){
        console.log('Estudo deletado com sucesso!', resJson)
        dataFetch()
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className='w-100'>
      <hr />
        <div className={dNone ? styles.noBorder : styles.localOrg}>
        <h5>📅 Meu Cronograma de Estudos</h5>
        <hr />
          <form onSubmit={handleCreate} className={dNone ? 'd-none' : styles.formStudy}>
            {/* Adicionar nova matéria */}
            <div className='mb-3 input-group'>
              <span className="input-group-text"><i className="bi bi-book"></i></span>
              <input
              type="text"
              className='form-control'
              placeholder='Nome da Matéria'
              value={newStudy.subject}
              onChange={(e) => setNewStudy({
                ...newStudy, subject: e.target.value
              })}
              />
            </div>
          
            {/* Adicionar dia de estudo */}
            <div className='mb-3 input-group'>
              <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
                <select value={newStudy.day}
                className="form-select"
                onChange={(e) => setNewStudy({
                  ...newStudy, day: e.target.value
                })}
                >
                  {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
            </div>
            <div className="flex gap-2">
              <div className='mb-3'>
                <span>Horário de início:</span>
                <input
                  type="time"
                  value={newStudy.startTime}
                  onChange={(e) => setNewStudy({ ...newStudy, startTime: e.target.value })}
                  className="p-2 border rounded"
                />
              </div>
              <div className='mb-3'>
                <span>Horário de fim:</span>
                <input
                  type="time"
                  value={newStudy.endTime}
                  onChange={(e) => setNewStudy({ ...newStudy, endTime: e.target.value })}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <div className='w-100 d-flex justify-content-center'>
              <button type='submit' className='btn btn-success'>
                <i class="bi bi-plus-circle"></i>
              </button>
            </div>
          </form>
        </div> 
        
        {/* Tabela para armazenar cadastro de matérias */}
        <div className={styles.localTable}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Matéria</th>
                <th scope="col">Dia</th>
                <th scope="col">Início</th>
                <th scope="col">Fim</th>
                <th scope="col">Lembrete</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length > 0 ? schedule.map((study, index) => (
                <tr key={index}>
                  <td scope="row">{study.subject}</td>
                  <td>{study.day}</td>
                  <td>{study.startTime}</td>
                  <td>{study.endTime}</td>
                  <td>{study.reminder ? 'Sim' : 'Não'}</td>
                  <td>
                    <button onClick={() => handleDelete(study._id)} className='btn btn-danger'>
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              )):
                <div className='w-100 p-3 d-flex'>
                  <small>Você não cadastrou nenhuma matéria ainda, acesse <strong>"meus estudos"</strong> e comece a cadastrar!"</small>
                </div>
              }
            </tbody>
          </table>
        </div>

    </div>
  )
}

export default OrgStudies