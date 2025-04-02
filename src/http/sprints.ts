import axios from "axios";
import { API_URL_Sprints } from "../utils/constantes"; 
import { ISprint, ISprintList } from "../types/ISprints";


export const putSprintList = async (sprints: ISprint[]) => {
  try {
    // Hacemos una petición PUT a la API enviando la lista de proyectos
    const response = await axios.put<ISprintList>(API_URL_Sprints, {
      sprints: sprints, // Enviamos los proyectos en el body de la solicitud
    });

    return response.data; // Devolvemos la respuesta de la API
  } catch (error) {
    console.error("Algo salió mal en putSprintlist", error);
  }
};
