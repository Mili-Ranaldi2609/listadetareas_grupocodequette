import { create } from "zustand";
import { ITarea } from "../types/ITareas";


//tipamos el store
//el set nos permite modificar los elementos del create
interface ITareaStore{
    tareas:ITarea[]
    tareaActiva:ITarea| null
    setTareaActiva:(tareaActiva:ITarea| null)=>void
    setArrayTareas:(arrayDeTareas:ITarea[])=>void
    agregarNuevaTarea:(nuevaTarea:ITarea)=>void
    editarTarea:(tareaActualizada:ITarea)=>void
    eliminarTarea:(idTarea:string)=>void

}

export const tareaStore= create<ITareaStore>((set)=>({
    //definimos nuestras variables que las cuales permaneceran sus estados y las funciones modificadoras
    tareas:[],
    tareaActiva:null,
    ///funciones modificadoras para el array    
        //agregar array de tareas
        setArrayTareas:(arrayDeTareas)=>set(()=>({tareas:arrayDeTareas})),
        //agregar una tarea al array /// el state presenta el vaor de esta variable
        agregarNuevaTarea:(nuevaTarea)=>set((state)=>({tareas: [...state.tareas, nuevaTarea] })),
        //editar una tarea del array
        ///recorrimos las tareas que ya estaban en el estado 
        ///verificamos si alguna coincidia con el id
        editarTarea:(tareaEditada)=>set((state)=>{                                      ///iteracion del elemento se cambian los valores 
            const arregloTreas=state.tareas.map((tarea)=>tarea.id===tareaEditada.id ?{...tarea,...tareaEditada}:tarea)
            return{tareas:arregloTreas}
        }),
        //eliminar una tarea del array 
        eliminarTarea:(idTarea)=>
            set((state)=>{                                      
            const arregloTreas=state.tareas.filter((tarea)=>tarea.id!==idTarea)
            return{tareas:arregloTreas} 
        }),
        //setear la tarea activa
        setTareaActiva:(tareaActivaIn)=>set(()=>({tareaActiva:tareaActivaIn}))
}))