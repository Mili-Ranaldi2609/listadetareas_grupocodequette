import { FC } from "react"
import { ITarea } from "../../../types/ITareas"
import styles from "./CardTarea.module.css"
import { useTareas } from "../../../hooks/useTarea";
type ICardTarea={
    tarea:ITarea;
    handleOpenModalEdit:(tarea:ITarea)=>void;
}
export const CardTarea:FC<ICardTarea>=({tarea,handleOpenModalEdit})=>{
    const{deleteTarea}=useTareas()
    const eliminarTarea=()=>{
       deleteTarea(tarea.id!)
        
    }
    const editarTarea=()=>{
        handleOpenModalEdit(tarea)
        
    }

    return <div className={styles.containerCard}>
       <div>
            <h3>Titulo: {tarea.titulo}</h3>
            <p>Descripcion: {tarea.descripcion}</p>
            <p>Fecha Limite: <b>{tarea.fechaLimite}</b></p>
       </div>
       <div className={styles.actionCard}>
        <button onClick={eliminarTarea}>Eliminar</button>
        <button onClick={editarTarea}>Editar</button>
       </div>
    </div>
}