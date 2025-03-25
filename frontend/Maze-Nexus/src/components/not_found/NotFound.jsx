import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <>
        <div className={styles.contentNot}>
          <h1>404</h1>
          <p>Página não encontrada...</p>
        </div>
    </>
  )
}

export default NotFound