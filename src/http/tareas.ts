import axios from "axios"; // Importamos axios para hacer solicitudes HTTP
import { ITarea } from "../types/ITareas";
import { IBacklog } from "../types/IBacklog";
import {config} from "../../config/config.ts"
// Función para actualizar el objeto global del json server
export const putTareasBacklog = async (tareas: ITarea[]) => {
  try {
    // Hacemos una petición PUT a la API enviando la lista de proyectos
    const response = await axios.put<IBacklog>(config.PortBacklog, {
      tareas: tareas, // Enviamos los proyectos en el body de la solicitud
    });

    return response.data; // Devolvemos la respuesta de la API
  } catch (error) {
    console.error("Algo salió mal en putTareasBacklog", error); // Capturamos y mostramos errores en la consola
  }
};
