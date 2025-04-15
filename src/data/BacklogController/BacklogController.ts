import axios from "axios"
import { putTareasBacklog } from "../../http/tareas";
import { ITarea } from "../../types/ITareas";

import {config} from "../../../config/config.ts"
 export const getAllTareas = async ():Promise < ITarea[] | undefined
 > => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(config.PortBacklog);
        return response.data.tareas; // Asegura que devuelves el array de tareas
    } catch (error) {
        console.error("Error en el getAlltareas del controller:", error);
        return []; // Devuelve un array vacío en caso de error para evitar que `undefined` rompa el código
    }
};

    export const postNuevaTarea = async (nuevaTarea: ITarea) => {
        try {
            // Obtiene el backlog actual
            const response = await axios.get<{ tareas: ITarea[] }>(config.PortBacklog);
    
            // Agrega la nueva tarea al array de tareas
            const nuevasTareas = [...response.data.tareas, nuevaTarea];
    
            // Envía el nuevo array con un PUT
            await axios.put(config.PortBacklog, { tareas: nuevasTareas });
    
            return nuevaTarea;
        } catch (error) {
            console.error("Error al agregar nueva tarea:", error);
        }
    };


//Editar tarea
export const editarTareaAPI = async (tareaActualizada: ITarea) => {
    try {
        const tareasBacklog = await getAllTareas();
        if (tareasBacklog) {
            const result = tareasBacklog.map((tareaB) =>
                tareaB.id === tareaActualizada.id ? { ...tareaB, ...tareaActualizada } : tareaB
            );
            await putTareasBacklog(result);
        }
        return tareaActualizada; // Devuelve la tarea editada
    } catch (error) {
        console.log("Error al editar tarea:", error);
        throw new Error("Error al editar tarea");
    }
};


 export const eliminarTareaPorID=async (idTarea:string)=>{
    try {
        const tareasBacklog= await getAllTareas()
        if (tareasBacklog) {
            const result=tareasBacklog.filter(
                (tareaB) => tareaB.id !== idTarea
            )
            await putTareasBacklog(result); 
        }
    } catch (error) {
        console.log("error en eliminar tarea del controller",error);
        
    }
 }