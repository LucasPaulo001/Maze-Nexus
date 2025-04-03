import styles from './OrgStudies.module.css'

const OrgStudies = () => {
  return (
    <div>
      <hr />

        <h5>Crie seu cronograma de estudo personalizado!</h5>
        <table className={`${styles.localTable} table`}>
        <thead>
          <tr>
            <th scope="col">Horário</th>
            <th scope="col">Segunda</th>
            <th scope="col">Terça</th>
            <th scope="col">Quarta</th>
            <th scope="col">Quinta</th>
            <th scope="col">Sexta</th>
            <th scope="col">Sábado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrgStudies