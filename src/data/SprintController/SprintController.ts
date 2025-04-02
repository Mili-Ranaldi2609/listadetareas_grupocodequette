import axios from "axios";
import { ISprint } from "../../types/ISprints";
import { API_URL_Sprints } from "../../utils/constantes";

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