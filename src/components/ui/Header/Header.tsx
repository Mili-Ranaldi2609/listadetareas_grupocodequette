import styles from "./Header.module.css";
export const Header=()=>{
    
    return(
      <div >
          <div className={styles.containerHeader} >
            <div className={styles.containerTitleHeader} >
              <h1>Administracion de Tareas</h1>
            </div>
        </div>
      </div>
    )
}