import { FC } from "react"
import { ITarea } from "../../../types/ITareas"
import { useTareas } from "../../../hooks/useTarea"


type ICardTarea ={
    tarea:ITarea
    handleOpenModalEdit: (tarea: ITarea)=> void
}

export const CardTarea:FC<ICardTarea>=({tarea, handleOpenModalEdit}) =>{
    const {eliminarTarea}= useTareas()
    const EliminarTareaById=()=>{
        eliminarTarea(tarea.id!)
    }
    const EditarTarea=()=>{
        handleOpenModalEdit(tarea)
    }
    return(
        <div >
            <div>
                <h3>Titulo: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>
                    <b>Fecha Limite: {tarea.fechaLimite}</b>
                </p>
                <button >Enviar a </button>
            </div>
            <div >
                <button onClick={EliminarTareaById}>Eliminar</button>
                <button onClick={EditarTarea}>Editar</button>
            </div>
        </div>
    )
}