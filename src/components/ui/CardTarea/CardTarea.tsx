import { FC, useEffect, useState } from "react";
import { ITarea } from "../../../types/ITareas";
import styles from "./CardTarea.module.css";
import { useTareas } from "../../../hooks/useTarea";
import DetalleTarea from "./DetalleTarea/DetalleTarea";
import { ISprint } from "../../../types/ISprints";
import { config } from "../../../../config/config";
import axios from "axios";
import Swal from "sweetalert2";

type ICardTarea = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
  refreshBacklog: () => void;
};

export const CardTarea: FC<ICardTarea> = ({ tarea, handleOpenModalEdit, refreshBacklog }) => {
  const [backlogTareas, setBacklogTareas] = useState<ITarea[]>([]); // Definir el estado para las tareas del backlog

  //listando los sprint para enviar la tarea
  const [sprints, setSprints] = useState<ISprint[]>([]);
  const [sprintSeleccionado, setSprintSeleccionado] = useState<string>("");
  //obteniendo los sprints
  const obtenerSprints = async () => {
    try {
      const response = await axios.get(config.PortSprintList);
      setSprints(response.data.sprints || response.data); // Ajustá según cómo te llegue la data
    } catch (error) {
      console.error("Error al obtener los sprints", error);
    }
  };
  useEffect(() => {
    const obtenerBacklog = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/backlog");
        setBacklogTareas(data.tareas); // Actualiza el estado con las tareas del backlog
      } catch (error) {
        console.error("Error al obtener el backlog", error);
      }
    };

    obtenerBacklog();
  }, []);

  const { deleteTarea } = useTareas();
  const [mostrarDetalle, setMostrarDetalle] = useState(false); // Estado para controlar el modal

  const eliminarTarea = () => {
    deleteTarea(tarea.id!);
  };

  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  };

  const verDetalle = () => {
    setMostrarDetalle(true);
  };

  const enviarATareaASprint = async (idTarea: string, idSprint: string) => {
    try {
      // Obtener datos de backlog y sprintList
      const { data: backlogData } = await axios.get("http://localhost:3000/backlog");
      const { data: sprintListData } = await axios.get("http://localhost:3000/sprintList");

      // Buscar la tarea que quieres mover del backlog
      const tarea = backlogData.tareas.find((t: any) => t.id === idTarea);

      if (!tarea) {
        console.error("Tarea no encontrada en el backlog");
        return;
      }

      // Buscar el sprint donde agregar la tarea
      const sprint = sprintListData.sprints.find((s: any) => s.id === idSprint);

      if (!sprint) {
        console.error("Sprint no encontrado");
        return;
      }

      // Agregar la tarea al sprint
      sprint.tareas.push(tarea);

      // Eliminar la tarea del backlog
      const nuevasTareas = backlogData.tareas.filter((t: any) => t.id !== idTarea);

      // Actualizar el backlog
      await axios.put("http://localhost:3000/backlog", { tareas: nuevasTareas });

      // Actualizar el sprintList
      await axios.put("http://localhost:3000/sprintList", { sprints: sprintListData.sprints });

      // Actualizar el estado local de los sprints y backlog para reflejar el cambio en la UI
      setSprints([...sprintListData.sprints]);
      // Si tienes un estado para el backlog, actualízalo también
      setBacklogTareas([...nuevasTareas]);
      refreshBacklog();

      Swal.fire('¡Éxito!', 'Tarea movida a una Sprint correctamente', 'success');
      console.log("Tarea movida correctamente al sprint");
    } catch (error) {
      console.error("Error al enviar la tarea al sprint", error);
      Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo mover la tarea al Backlog"
     });
    }
  };


  useEffect(() => {
    obtenerSprints();
  }, []);

  return (
    <>
      <div className={styles.containerCard}>
        <div className={styles.titulos}>
          <p><b>Titulo: </b>{tarea.titulo}</p>
          <p><b>Descripcion: </b>{tarea.descripcion}</p>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.buttonenviarasprint}>
            <button onClick={(e) => {
              e.preventDefault(); // Prevenir el comportamiento por defecto si es necesario
              if (sprintSeleccionado) {
                enviarATareaASprint(tarea.id, sprintSeleccionado); // Usar sprintSeleccionado que tiene el id del sprint
              } else {
                console.error("No se ha seleccionado un sprint.");
              }
            }}>Enviar A<span className="material-symbols-outlined">playlist_play</span></button>
            <select className={styles.selectsprint}
              name="Sprint"
              value={sprintSeleccionado}
              onChange={(e) => setSprintSeleccionado(e.target.value)}
              required
            >
              <option value="">Selecciona una Sprint</option>
              {sprints.map((sprint) => (
                <option key={sprint.id} value={sprint.id}>
                  {sprint.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonEliminar}>
            <button onClick={eliminarTarea}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <div className={styles.buttonEditar}>
            <button onClick={editarTarea}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <div className={styles.buttonVer}>
            <button onClick={verDetalle}>
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>
      </div>

      {/* Renderizar el modal solo si mostrarDetalle es true */}
      {mostrarDetalle && (
        <DetalleTarea tarea={tarea} onClose={() => setMostrarDetalle(false)} />
      )}
    </>
  );
};
