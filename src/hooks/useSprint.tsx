import { useShallow } from "zustand/shallow"
import { sprintStore } from "../store/sprintStore"
import { getAllSprint } from "../data/SprintController/SprintController"

export const useSprint=()=>{
    //cuando hacemos un getAll tenemos que meter las tareas directamente desde aca 
    const{sprints,setSprints}=sprintStore(useShallow((state)=>({
        sprints:state.sprints,
        setSprints:state.setArraySprints,

    })))
    //funcion que trae las tareas
    const getSprints=async()=>{
        const data= await getAllSprint()
            if (data)setSprints(data)
        }
  
    return{
        //exporta nuestro hook
        getSprints,
        sprints
    }
}