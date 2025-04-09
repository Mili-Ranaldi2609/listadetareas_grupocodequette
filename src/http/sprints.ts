import axios from "axios";
import { ISprint, ISprintList } from "../types/ISprints";
import {config} from "../../config/config.ts"

export const putSprintList = async (sprints: ISprint[]) => {
  try {
    // Hacemos una petición PUT a la API enviando la lista de proyectos
    const response = await axios.put<ISprintList>(config.PortSprintList, {
      sprints: sprints, // Enviamos los proyectos en el body de la solicitud
    });

    return response.data; // Devolvemos la respuesta de la API
  } catch (error) {
    console.error("Algo salió mal en putSprintlist", error);
  }
};
