import axios from "axios";
import { ISprint } from "../../types/ISprints";
import { API_URL_Sprints } from "../../utils/constantes";
import { putSprintList } from "../../http/sprints";

export const getAllSprint = async ():Promise < ISprint[] | undefined
> => {
   try {
       const response = await axios.get<{ sprints: ISprint[] }>(API_URL_Sprints);
       return response.data.sprints; 
   } catch (error) {
       console.error("Error en el getAllSprints del controller:", error);
       return []; 
   }
};


export const createSprintController = async (sprintNueva: ISprint) => {
    try {
      const sprints = await getAllSprint();
  
      if (sprints) {
        await putSprintList([...sprints, sprintNueva]);
      } else {
        await putSprintList([sprintNueva]);
      }
  
      return sprintNueva; 
    } catch (error) {
      console.log("Error en createsprintController", error);
    }
  };
  export const updateSprintController = async (sprintActualizada: ISprint
  ) => {
    try {
      const sprints = await getAllSprint();
  
      if (sprints) {
        const result = sprints.map((sprint) =>
          sprint.id === sprintActualizada.id
            ? { ...sprint, ...sprintActualizada } 
            : sprint
        );
  
        await putSprintList(result); 
      }
      return sprintActualizada; 
    } catch (error) {
      console.log("Error en updateSprintController", error);
    }
  };
  

  export const deleteSprintController = async (idSprintAEliminar: string) => {
    try {
      const sprints = await getAllSprint();
      if (sprints) {
        const result = sprints.filter(
          (sprint) => sprint.id !== idSprintAEliminar
        );
  
        await putSprintList(result); 
      }
    } catch (error) {
      console.log("Error en deleteSprintController", error);
    }
  };
  