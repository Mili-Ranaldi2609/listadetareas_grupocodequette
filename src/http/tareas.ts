import axios from "axios"
import { ITarea } from "../types/ITareas"

 
 const API_URL='http://localhost:3000/backlog'

 export const getAllTareas = async () => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
        return response.data.tareas; // Asegura que devuelves el array de tareas
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        return []; // Devuelve un array vacío en caso de error para evitar que `undefined` rompa el código
    }
};

    export const postNuevaTarea = async (nuevaTarea: ITarea) => {
        try {
            // Obtiene el backlog actual
            const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
    
            // Agrega la nueva tarea al array de tareas
            const nuevasTareas = [...response.data.tareas, nuevaTarea];
    
            // Envía el nuevo array con un PUT
            await axios.put(API_URL, { tareas: nuevasTareas });
    
            return nuevaTarea;
        } catch (error) {
            console.error("Error al agregar nueva tarea:", error);
        }
    };


// Editar una tarea existente
export const editarTarea = async (tareaActualizada: ITarea) => {
    try {
        const response = await axios.put<ITarea>(`${API_URL}/${tareaActualizada.id}`, {
            ...tareaActualizada
        });
        return response.data; // Retorna la tarea actualizada
    } catch (error) {
        console.log("Error al editar tarea:", error);
        throw new Error("Error al editar tarea");
    }
};
 export const eliminarTareaPorID=async (idTarea:string)=>{
    try {
        const response=await axios.delete<ITarea>(`${API_URL}/${idTarea}`)
        return response.data
    } catch (error) {
        console.log(error);
        
    }
 }