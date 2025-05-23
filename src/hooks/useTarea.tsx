import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { ITarea } from "../types/ITareas"
import Swal from "sweetalert2"
import { editarTareaAPI, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../data/BacklogController/BacklogController"

export const useTareas=()=>{
    //cuando hacemos un getAll tenemos que meter las tareas directamente desde aca 
    const{tareas,setTareas,agregarNuevaTarea,eliminarTarea,editarTarea}=tareaStore(useShallow((state)=>({
        tareas:state.tareas,
        setTareas:state.setArrayTareas,
        agregarNuevaTarea:state.agregarNuevaTarea,
        eliminarTarea:state.eliminarTarea,
        editarTarea:state.editarTarea 
    })))
    //funcion que trae las tareas
    const getTareas=async()=>{
        const data= await getAllTareas()
            if (data)setTareas(data)
        }
    //funcion que crea una tarea
    const createTarea=async(nuevaTarea:ITarea)=>{
        agregarNuevaTarea(nuevaTarea)
       try {
        await postNuevaTarea(nuevaTarea)
        Swal.fire('¡Exito!','Tarea creada correctamente','success')
       } catch (error) {
        eliminarTarea(nuevaTarea.id!)
        console.log(error," - algo salio mal al crear la tarea");
       }

    }
     //funcion que edita una tarea
     const updateTarea = async (tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
        editarTarea(tareaEditada); // Actualiza el estado local
    
        try {
            const tareaActualizada = await editarTareaAPI(tareaEditada); // Llamada a la API
            if (tareaActualizada) editarTarea(tareaActualizada); // Actualiza estado con la respuesta
            Swal.fire('¡Éxito!', 'Tarea editada correctamente', 'success');
        } catch (error) {
            if (estadoPrevio) editarTarea(estadoPrevio); // Volvemos al estado anterior en caso de error
            console.log(error, ' - algo salió mal al editar');
        }
    };
    
     //funcion que elimina una tarea
     const deleteTarea=async(idTarea:string)=>{
        //si algo me llegara a salir mal yo necesito volver a un estado anterior
        const estadoPrevio=tareas.find((el)=>el.id===idTarea)
        //alert de confirmar para eliminar una tarea
        const confirm=await Swal.fire({
            title:'¿Estas Seguro?',
            text:'Esta accion no se puede deshacer',
            icon:'warning',
            showCancelButton:true,
            confirmButtonText:'Si, Eliminar',
            cancelButtonText:'Cancelar'
        })
        if(!confirm.isConfirmed)return
        eliminarTarea(idTarea)
       try {
        await eliminarTareaPorID(idTarea)
        Swal.fire('Eliminado','La tarea se elimino correctamente','success')
       } catch (error) {
        if(estadoPrevio) editarTarea(estadoPrevio)
        console.log(error,' - algo salio mal al eliminar');
       }
 
     }
     
    return{
        //exporta nuestro hook
        getTareas,
        createTarea,
        updateTarea,
        deleteTarea,
        tareas
    }
}