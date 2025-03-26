import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorId, getAllTareas, postNuevaTarea } from "../http/tareas"
import { ITarea } from "../types/ITareas"
import Swal from "sweetalert2"

export const useTareas= ()=>{
    const {tareas, setArrayTarea, agregarNuevaTarea, eliminarUnaTarea, editarTarea}= tareaStore(useShallow((state)=> ({
        tareas: state.tareas,
        setArrayTarea: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarTarea: state.editarUnaTarea
    })))
    const getTareas= async()=>{
        const data=await getAllTareas()
        if (data) setArrayTarea(data);
    }
    const crearTarea =async(nuevaTarea:ITarea)=>{
        agregarNuevaTarea(nuevaTarea);
        try{
            const data =await postNuevaTarea(nuevaTarea)
            Swal.fire("Tarea creada correctamente")
        }catch(error){
            eliminarUnaTarea(nuevaTarea.id!)
            console.log("algo salio mal al crear la tarea")
        }
    }
    const putTareaEditar =async(tareaEditada:ITarea)=>{
        const estadoPrevio=tareas.find((el)=>el.id === tareaEditada.id)
    
        editarTarea(tareaEditada)
        try {
            await editarTarea(tareaEditada)
            Swal.fire("Tarea editada correctamente")
        } catch (error) {
           if (estadoPrevio) editarTarea(estadoPrevio);
           console.log("algo salio mal al editar")
        }
    }
    const eliminarTarea =async(idTarea: string)=>{
        const estadoPrevio=tareas.find((el)=>el.id === idTarea)
        const confirm= await Swal.fire({
            title:"Estas seguro?",
            text:"Esta accion no se puede deshacer",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Eliminar",
            cancelButtonText:"Cancelar"
        })
        if(!confirm.isConfirmed) return;
        eliminarTarea(idTarea)
        try {
            await eliminarTareaPorId(idTarea)
            Swal.fire("Tarea eliminada")
        } catch (error) {
            if(estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("algo salio mal al eliminar" )
        }
    }
    return{
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas
    }
}