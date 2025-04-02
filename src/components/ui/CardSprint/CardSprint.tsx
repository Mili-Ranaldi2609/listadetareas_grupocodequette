import { FC, useState } from "react";
import styles from './CardSprint.module.css'
import { ISprint } from "../../../types/ISprints";
type ICardSprint = {
  sprint: ISprint;/* 
  handleOpenModalEdit: (sprint: ISprint) => void; */
};

export const CardSprint: FC<ICardSprint> = ({ sprint/* , handleOpenModalEdit  */}) => {
  /* const { deleteTarea } = useSprint();
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
 */
  return (
    <>
      <div className={styles.containerCard}>
        <div className={styles.titulos}>
          <p><b>Titulo: </b>{sprint.nombre}</p>
          <p><b>Fecha Inicio: </b>{sprint.fechaInicio}</p>
          <p><b>Fecha Fin: </b>{sprint.fechaCierre}</p>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.buttonEliminar}>
            <button /*onClick={/* eliminarTarea */>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <div className={styles.buttonEditar}>
            <button /* onClick={editarTarea}*/>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <div className={styles.buttonVer}>
            <button /*onClick={verDetalle}*/>
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>
      </div>

      { /*Renderizar el modal solo si mostrarDetalle es true*/ }
      {/*mostrarDetalle && (
        <DetalleTarea tarea={tarea} onClose={() => setMostrarDetalle(false)} />
      )*/}
    </>
  );
};
