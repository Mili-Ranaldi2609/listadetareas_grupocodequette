import axios from "axios";
import { ISprint } from "../../types/ISprints";
import { putSprintList } from "../../http/sprints";
import { config } from "../../../config/config.ts"
import { ITarea } from "../../types/ITareas.ts";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
//listar las sprints 
export const getAllSprint = async (): Promise<ISprint[] | undefined
> => {
  try {
    const response = await axios.get<{ sprints: ISprint[] }>(config.PortSprintList);
    return response.data.sprints;
  } catch (error) {
    console.error("Error en el getAllSprints del controller:", error);
    return [];
  }
};

//crear una sprint 
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
//editar una sprint 
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
//eliminar una sprint
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
//agregar una tarea a una sprint 
export const addTaskToSprintController = async (
  idSprint: string, nuevaTarea: ITarea
) => {
  try {
    const sprints = await getAllSprint();

    if (!sprints) throw new Error("No se encontraron sprints.");

    const sprintsActualizados = sprints.map((sprint) => {
      if (sprint.id === idSprint) {
        const tareaConId = { ...nuevaTarea, id: uuidv4() };

        const tareasActualizadas = sprint.tareas
          ? [...sprint.tareas, tareaConId]
          : [tareaConId];
        return { ...sprint, tareas: tareasActualizadas };
      }
      return sprint;
    });

    await putSprintList(sprintsActualizados);

    return sprintsActualizados.find((s) => s.id === idSprint);
  } catch (error) {
    console.error("Error al agregar tarea al sprint:", error);
  }
};
//actualizar una tarea en una sprint 
export const updateTaskInSprintController = async (
  idSprint: string,
  tareaActualizada: ITarea
) => {
  try {
    const sprints = await getAllSprint();
    if (!sprints) throw new Error("No se encontraron sprints.");

    const sprintsActualizados = sprints.map((sprint) => {
      if (sprint.id === idSprint && sprint.tareas) {
        const tareasActualizadas = sprint.tareas.map((tarea) =>
          tarea.id === tareaActualizada.id ? tareaActualizada : tarea
        );
        return { ...sprint, tareas: tareasActualizadas };
      }
      return sprint;
    });

    await putSprintList(sprintsActualizados);

    return sprintsActualizados.find((s) => s.id === idSprint);
  } catch (error) {
    console.error("Error al actualizar tarea en el sprint:", error);
  }
};

export const deleteTaskByIdOfStringController = async (idSprint: string, idTarea: string) => {
  try {
    console.log("ID Sprint recibido:", idSprint);
    console.log(" ID Tarea recibido:", idTarea);
    const sprints = await getAllSprint();
    if (!sprints) throw new Error("No se encontraron sprints.");

     // Buscar la sprint específica
     const sprintActualizada = sprints.find((s) => s.id === idSprint);
     if (!sprintActualizada) throw new Error("Sprint no encontrada.");
 
     // Filtrar las tareas para eliminar la que corresponde
     sprintActualizada.tareas = sprintActualizada.tareas.filter(
       (tarea) => tarea.id !== idTarea
     );
 
     // Armar la nueva lista de sprints
     const sprintsActualizados = sprints.map((s) =>
       s.id === idSprint ? sprintActualizada : s
     );
 
     await putSprintList(sprintsActualizados);
 
     console.log("Tarea eliminada con éxito");
     return sprintActualizada;
  } catch (error) {
    console.error("Error al intentar eliminar la tarea:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo eliminar la tarea de la Sprint",
    });
  }
}

