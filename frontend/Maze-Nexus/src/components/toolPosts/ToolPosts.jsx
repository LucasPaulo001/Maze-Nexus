import styles from './ToolPosts.module.css'

const ToolPosts = () => {

  return (
    <div className={styles.toolMenu}>
        <ul className={styles.listTools}>
            <li>Editar</li>
            <li>Excluir</li>
        </ul>
    </div>
  )
}

export default ToolPosts