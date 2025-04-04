import { useShallow } from "zustand/shallow"
import { sprintStore } from "../store/sprintStore"
import { createSprintController, deleteSprintController, getAllSprint, updateSprintController } from "../data/SprintController/SprintController"
import { ISprint } from "../types/ISprints"
import Swal from "sweetalert2"

export const useSprint=()=>{
    //cuando hacemos un getAll tenemos que meter las tareas directamente desde aca 
    const{sprints,setSprints,agregarNuevaSprint,eliminarSprint,editarSprint}=sprintStore(useShallow((state)=>({
        sprints:state.sprints,
        setSprints:state.setArraySprints,
        agregarNuevaSprint:state.agregarNuevaSprint,
        eliminarSprint:state.eliminarSprint,
        editarSprint:state.editarSprint 
    })))
    //funcion que trae las tareas
    const getSprints=async()=>{
        const data= await getAllSprint()
            if (data)setSprints(data)
        }
    //funcion que crea una sprint
        const createSprint=async(nuevaSprint:ISprint)=>{
            agregarNuevaSprint(nuevaSprint)
           try {
            await createSprintController(nuevaSprint)
            Swal.fire('¡Exito!','Tarea creada correctamente','success')
           } catch (error) {
            eliminarSprint(nuevaSprint.id!)
            console.log(error," - algo salio mal al crear la tarea");
           }
    
        }
         //funcion que edita una sprint
         const updateSprint = async (sprintEditada: ISprint) => {
            const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id);
            editarSprint(sprintEditada); // Actualiza el estado local
        
            try {
                const sprintActualizada = await updateSprintController(sprintEditada); 
                if (sprintActualizada) editarSprint(sprintActualizada); 
                Swal.fire('¡Éxito!', 'Tarea editada correctamente', 'success');
            } catch (error) {
                if (estadoPrevio) editarSprint(estadoPrevio); // Volvemos al estado anterior en caso de error
                console.log(error, ' - algo salió mal al editar la sprint');
            }
        };
        
         //funcion que elimina una tarea
         const deleteSprint=async(idSprint:string)=>{
            //si algo me llegara a salir mal yo necesito volver a un estado anterior
            const estadoPrevio=sprints.find((el)=>el.id===idSprint)
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
            eliminarSprint(idSprint)
           try {
            await deleteSprintController(idSprint)
            Swal.fire('Eliminado','La tarea se elimino correctamente','success')
           } catch (error) {
            if(estadoPrevio) editarSprint(estadoPrevio)
            console.log(error,' - algo salio mal al eliminar');
           }
     
         }
    return{
        //exporta nuestro hook
        getSprints,
        createSprint,
        updateSprint,
        deleteSprint,
        sprints,

    }
}