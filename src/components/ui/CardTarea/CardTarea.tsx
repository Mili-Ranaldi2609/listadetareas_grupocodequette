import { FC } from "react"
import { ITarea } from "../../../types/ITareas"
import styles from "./CardTarea.module.css"
import { useTareas } from "../../../hooks/useTarea";
type ICardTarea = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;
}
export const CardTarea: FC<ICardTarea> = ({ tarea, handleOpenModalEdit }) => {
    const { deleteTarea } = useTareas()
    const eliminarTarea = () => {
        deleteTarea(tarea.id!)

    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)

    }

    return <div className={styles.containerCard}>
        <div className={styles.titulos}>
            <h3>Titulo: {tarea.titulo}</h3>
            <p>Descripcion: {tarea.descripcion}</p>
            <p>Fecha Limite: <b>{tarea.fechaLimite}</b></p>
        </div>
        <div className={styles.actionCard}>
            <div className={styles.buttonEliminar}>
                <button  onClick={eliminarTarea}><span className="material-symbols-outlined">delete</span></button>
            </div>
            <div className={styles.buttonEditar}>
                <button onClick={editarTarea}><span className="material-symbols-outlined">
edit
</span></button>
            </div>
            <div className={styles.buttonVer}>
                <button ><span className="material-symbols-outlined">
visibility
</span></button>
            </div>
        </div>
    </div>
}