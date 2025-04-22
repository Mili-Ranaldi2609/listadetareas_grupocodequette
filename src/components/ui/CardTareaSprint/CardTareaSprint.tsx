import { FC, useState } from "react";
import { ITarea } from "../../../types/ITareas";
import styles from "./CardTareaSprint.module.css";
import DetalleTarea from "./DetalleTareaSprint/DetalleTarea";
import axios from "axios";
import { sprintStore } from "../../../store/sprintStore";
import { tareaStore } from "../../../store/tareaStore";
import Swal from "sweetalert2";
import { ModalTareaSprint } from "../Modal/ModalTareaSprint";

type ICardTarea = {
  tarea: ITarea;
  idSprint: string
  handleOpenModalEdit: (tarea: ITarea) => void;
  refreshSprint: () => void;
};

export const CardTareaSprint: FC<ICardTarea> = ({ tarea, idSprint, refreshSprint, handleOpenModalEdit }) => {
  const sprintActiva = sprintStore((state) => state.sprintActiva)
  //estado modal
  const [openModalTarea, setOpenModalTarea] = useState(false)
  const tareaActiva = tareaStore(state => state.tareaActiva);
  const setTareaActiva = tareaStore(state => state.setTareaActiva);


  const [mostrarDetalle, setMostrarDetalle] = useState(false); // Estado para controlar el modal
  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };


  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  };

  const verDetalle = () => {
    setMostrarDetalle(true);
  };
  const enviarTareaABacklog = async (idTarea: string) => {
    try {
      // Obtener los datos actuales de los sprints y backlog
      const { data: sprintList } = await axios.get("http://localhost:3000/sprintList");
      const { data: backlog } = await axios.get("http://localhost:3000/backlog");

      // Buscar la tarea en cualquiera de las sprints
      let tareaEncontrada = null;
      for (const sprint of sprintList.sprints) {
        const tareaIndex = sprint.tareas.findIndex((t: any) => t.id === idTarea);
        if (tareaIndex !== -1) {
          tareaEncontrada = sprint.tareas[tareaIndex];
          // Eliminar de la sprint
          sprint.tareas.splice(tareaIndex, 1);
          break;
        }
      }

      if (!tareaEncontrada) {
        console.error("Tarea no encontrada en ninguna sprint");
        return;
      }

      // Agregar la tarea al backlog
      backlog.tareas.push(tareaEncontrada);

      // Guardar los cambios
      await axios.put("http://localhost:3000/sprintList", { sprints: sprintList.sprints });
      await axios.put("http://localhost:3000/backlog", backlog);

      refreshSprint(); // Refrescar sprint actual
      Swal.fire('¡Éxito!', 'Tarea movida al backlog correctamente', 'success');
      console.log("Tarea movida al backlog correctamente.");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo mover la tarea al Backlog"
      });
      console.error("Error al mover la tarea al backlog", error);
    }
  };

  return (
    <>
      <div className={styles.containerCard}>
        <div className={styles.titulos}>
          <p><b>Titulo: </b>{tarea.titulo}</p>
          <p><b>Descripcion: </b>{tarea.descripcion}</p>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.buttonEnviar_backlog}>
            <button onClick={(e) => {
              e.preventDefault();
              enviarTareaABacklog(tarea.id!);
            }}>Enviar a Backlog<span className="material-symbols-outlined"></span>
            </button>
          </div>
          <div className={styles.buttonEliminar}>
            <button>
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
      {openModalTarea && (
        <ModalTareaSprint
          handleCloseModal={handleCloseModal} idSprint={idSprint} tareaSeleccionada={tareaActiva}
        />
      )}
      {mostrarDetalle && (
        <DetalleTarea tarea={tarea} onClose={() => setMostrarDetalle(false)} />
      )}
    </>
  );
};
