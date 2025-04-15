import { useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Backlog.module.css"
import { useTareas } from "../../../hooks/useTarea"
import { ITarea } from "../../../types/ITareas"
import { CardTarea } from "../../ui/CardTarea/CardTarea"
import { ModalTarea } from "../../ui/Modal/ModalTarea"
///Llamamos la funcion que trae todas las tareas de la base de datos las setea el estado y podemos mostrarlo por pantalla
export const Backlog=()=>{
    const refreshBacklog = () => {
        getTareas();
      };
      
    //seteo tarea activa
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)
    const{tareas,getTareas}=useTareas()
    ///hacemos una resolucion de traer las tareas
    useEffect(()=>{
        getTareas()
    },[])

    //estado modal
    const [openModalTarea,setOpenModalTarea]=useState(false)
    //funcion que nos permite abrir el modal 
    const handleOpenModalEdit=(tarea:ITarea)=>{
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }
    //funcion que nos permite cerrar el modal
    const handleCloseModal=()=>{
        setOpenModalTarea(false)
    }
    return(
     <>
      <div className={styles.containerPrincipalListTareas}>
         <div className={styles.containerTitleAndButton}>
             <h2>Tareas en el Backlog</h2>
            <button onClick={()=>{
                setOpenModalTarea(true)
            }}>Agregar Tarea <span className="material-symbols-outlined">
            add_notes
            </span></button>
         </div>
         <div className={styles.containerList}>
            {   //se muestran las tareas por pantalla
                tareas.length>0?
                //implementamos el card list
                tareas.map((el)=>(<CardTarea
                    refreshBacklog={refreshBacklog} 
                    handleOpenModalEdit={handleOpenModalEdit}
                    tarea={el}/>)):(
                    <div>
                        <h3>No hay Tareas</h3>
                    </div>
                )
            }
         </div>
      </div>
     {openModalTarea &&<ModalTarea handleCloseModal={handleCloseModal}/>}
     
     </>
    )
}