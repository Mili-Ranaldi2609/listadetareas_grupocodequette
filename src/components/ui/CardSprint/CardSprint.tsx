import { FC, useState } from "react";
import styles from './CardSprint.module.css'
import { ISprint } from "../../../types/ISprints";
import { useSprint } from "../../../hooks/useSprint";
import DetalleSprint from "./DetalleSprint/DetalleSprint";
import { useNavigate } from "react-router-dom";
type ICardSprint = {
  sprint: ISprint;
  onClick: () => void;
  handleOpenModalEdit: (sprint: ISprint) => void; 
};

export const CardSprint: FC<ICardSprint> = ({ sprint,onClick, handleOpenModalEdit  }) => {
  const { deleteSprint } = useSprint();
  const [mostrarDetalle, setMostrarDetalle] = useState(false); // Estado para controlar el modal
  
    const navigate = useNavigate(); // Inicializa 
  const eliminarSprint = () => {
    deleteSprint(sprint.id!);
  
    // Verificar si la sprint eliminada es la que estaba activa en la URL
    if (window.location.pathname.includes(sprint.id!)) {
      navigate("/Backlog");
    }
  };
  

  const editarSprint = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpenModalEdit(sprint);
  };
  const verDetalle = () => {
    setMostrarDetalle(true);
  };
 
  return (
    <>
      <div className={styles.containerCard} onClick={onClick}>
        <div className={styles.titulos}>
          <p><b>Titulo: </b>{sprint.nombre}</p>
          <p><b>Fecha Inicio: </b>{sprint.fechaInicio}</p>
          <p><b>Fecha Fin: </b>{sprint.fechaCierre}</p>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.buttonEliminar}>
            <button onClick={eliminarSprint}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <div className={styles.buttonEditar}>
            <button onClick={editarSprint}>
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

      { /*Renderizar el modal solo si mostrarDetalle es true*/ }
      {mostrarDetalle && (
        <DetalleSprint sprint={sprint} onClose={() => setMostrarDetalle(false)} />
      )}
    </>
  );
};
