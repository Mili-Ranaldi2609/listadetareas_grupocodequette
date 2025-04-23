import { useShallow } from "zustand/shallow"
import { sprintStore } from "../store/sprintStore"
import {
    createSprintController, addTaskToSprintController,
    updateTaskInSprintController, deleteSprintController, getAllSprint, updateSprintController,
    deleteTaskByIdOfStringController
} from "../data/SprintController/SprintController"
import { ISprint } from "../types/ISprints"
import Swal from "sweetalert2"
import { ITarea } from "../types/ITareas"

export const useSprint = () => {
    //cuando hacemos un getAll tenemos que meter las sprints directamente desde aca 
    const { sprints, setSprints, agregarNuevaSprint, eliminarSprint, editarSprint } = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        setSprints: state.setArraySprints,
        agregarNuevaSprint: state.agregarNuevaSprint,
        eliminarSprint: state.eliminarSprint,
        editarSprint: state.editarSprint
    })))
    //funcion que trae las tareas
    const getSprints = async () => {
        const data = await getAllSprint()
        if (data) setSprints(data)
    }
    //funcion que crea una sprint
    const createSprint = async (nuevaSprint: ISprint) => {
        agregarNuevaSprint(nuevaSprint)
        try {
            await createSprintController(nuevaSprint)
            Swal.fire('¡Exito!', 'Tarea creada correctamente', 'success')
        } catch (error) {
            eliminarSprint(nuevaSprint.id!)
            console.log(error, " - algo salio mal al crear el sprint");
        }

    }
    //funcion que edita una sprint
    const updateSprint = async (sprintEditada: ISprint) => {
        const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id);
        editarSprint(sprintEditada); // Actualiza el estado local

        try {
            const sprintActualizada = await updateSprintController(sprintEditada);
            if (sprintActualizada) editarSprint(sprintActualizada);
            Swal.fire('¡Éxito!', 'Tarea editada correctamente', 'success');
        } catch (error) {
            if (estadoPrevio) editarSprint(estadoPrevio); // Volvemos al estado anterior en caso de error
            console.log(error, ' - algo salió mal al editar la sprint');
        }
    };

    //funcion que elimina una tarea
    const deleteSprint = async (idSprint: string) => {
        //si algo me llegara a salir mal yo necesito volver a un estado anterior
        const estadoPrevio = sprints.find((el) => el.id === idSprint)
        //alert de confirmar para eliminar una tarea
        const confirm = await Swal.fire({
            title: '¿Estas Seguro?',
            text: 'Esta accion no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        })
        if (!confirm.isConfirmed) return
        eliminarSprint(idSprint)
        try {
            await deleteSprintController(idSprint)
            Swal.fire('Eliminado', 'La tarea se elimino correctamente', 'success')
        } catch (error) {
            if (estadoPrevio) editarSprint(estadoPrevio)
            console.log(error, ' - algo salio mal al eliminar');
        }

    }
    const addTaskToSprint = async (idSprint: string, nuevaTarea: ITarea) => {
        const sprintActualizada = await addTaskToSprintController(idSprint, nuevaTarea);
        if (sprintActualizada) {
            editarSprint(sprintActualizada);
            Swal.fire('¡Éxito!', 'Tarea agregada correctamente', 'success');
        }
    };

    const updateTaskInSprint = async (idSprint: string, tareaActualizada: ITarea) => {
        const sprintActualizada = await updateTaskInSprintController(idSprint, tareaActualizada);
        if (sprintActualizada) {
            editarSprint(sprintActualizada);
            Swal.fire('¡Éxito!', 'Tarea actualizada correctamente', 'success');
        }
    };
    const deleteTaskInSprint = async (idSprint: string, idTarea: string) => {
        try {
            const sprintActualizada = await deleteTaskByIdOfStringController(idSprint, idTarea);
            if (sprintActualizada) {
                editarSprint(sprintActualizada);
                Swal.fire('¡Éxito!', 'Tarea eliminada correctamente', 'success');
            } else {
                Swal.fire('Error', 'No se pudo eliminar la tarea. Intente nuevamente', 'error');
            }
        } catch (error) {
            console.error("Error eliminando la tarea:", error);
            Swal.fire('Error', 'Hubo un problema al eliminar la tarea. Intente nuevamente', 'error');
        }
    };
    const actualizarEstadoTarea = async (idTarea: string, idSprint: string | undefined, nuevoEstado: string) => {
        const sprints = sprintStore.getState().sprints;
        const editarSprintsArray = sprintStore.getState().editarSprint;
        const sprint = sprints.find((s) => s.id === idSprint);
        if (!sprint) return;

        const tareasActualizadas = sprint.tareas.map((t) =>
            t.id === idTarea ? { ...t, estado: nuevoEstado } : t
        );

        const sprintActualizado: ISprint = {
            ...sprint,
            tareas: tareasActualizadas,
        };

        try {
            await updateSprintController(sprintActualizado); // Actualiza en la base de datos
            editarSprintsArray(sprintActualizado); // Actualiza en Zustand
            Swal.fire('¡Éxito!', 'Tarea cambiada de estado', 'success');
        } catch (error) {
            console.error("Error al actualizar estado de la tarea", error);
            Swal.fire("Error al actualizar estado", "", "error");
        }
    };


    return {
        //exporta nuestro hook
        getSprints,
        createSprint,
        updateSprint,
        deleteSprint, addTaskToSprint,
        updateTaskInSprint,
        deleteTaskInSprint,
        actualizarEstadoTarea,
        sprints,

    }
}