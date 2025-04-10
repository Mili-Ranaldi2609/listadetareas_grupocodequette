import { FC, useState } from "react";
import { ITarea } from "../../../types/ITareas";
import styles from "./CardTarea.module.css";
import { useTareas } from "../../../hooks/useTarea";
import DetalleTarea from "./DetalleTarea/DetalleTarea";

type ICardTarea = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardTarea: FC<ICardTarea> = ({ tarea, handleOpenModalEdit }) => {
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

  return (
    <>
      <div className={styles.containerCard}>
        <div className={styles.titulos}>
          <p><b>Titulo: </b>{tarea.titulo}</p>
          <p><b>Descripcion: </b>{tarea.descripcion}</p>
        </div>
        <div className={styles.actionCard}>
        <div className={styles.buttonEliminar}>
            <button >Enviar A<span className="material-symbols-outlined">playlist_play</span>
            </button>
            <select name="Sprint"required>
              <option value="">Selecciona una Sprint</option>
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
