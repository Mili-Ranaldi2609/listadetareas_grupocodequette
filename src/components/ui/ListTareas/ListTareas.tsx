import { useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"


import { ITarea } from "../../../types/ITareas"
import { useTareas } from "../../../hooks/useTarea"
import { ModalTarea } from "../Modal/ModalTarea"
import { CardTarea } from "../CardTarea/CardTarea"

///Llamamos la funcion que trae todas las tareas de la base de datos las setea el estado y podemos mostrarlo por pantalla
export const ListTareas=()=>{
   
    //seteo tarea activa
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)
    const{getTareas,tareas}=useTareas()
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
      <div>
         <div >
            <h2>Backlog</h2>
            <button onClick={()=>{
                setOpenModalTarea(true)
            }}>Agregar Tarea</button>
         </div>
         <div >
            {   //se muestran las tareas por pantalla
                tareas.length>0?
                //implementamos el card list
                tareas.map((el)=>(<CardTarea
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