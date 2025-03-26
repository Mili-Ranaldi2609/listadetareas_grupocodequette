import axios from "axios";
import { ITarea } from "../types/ITareas";

const API_URL="http://localhost:3000/tareas";
export const getAllTareas= async()=>{
    try{
        const response =await axios.get<ITarea[]>(API_URL);
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export const postNuevaTarea= async(nuevaTarea:ITarea)=>{
    try{
        const response =await axios.post<ITarea>(API_URL,{...nuevaTarea,});
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export const editarTarea= async(TareaActualizada:ITarea)=>{
    try{
        const response =await axios.put<ITarea[]>(`${API_URL}/${TareaActualizada.id}`, {...TareaActualizada,});
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export const eliminarTareaPorId= async(idTarea:string)=>{
    try{
        const response =await axios.delete<ITarea[]>(`${API_URL}/${idTarea}`);
        return response.data;
    }catch(error){
        console.log(error);
    }
}