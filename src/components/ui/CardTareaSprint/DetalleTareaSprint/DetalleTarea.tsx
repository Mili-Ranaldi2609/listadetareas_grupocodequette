import React from 'react';
import { ITarea } from '../../../../types/ITareas';
import styles from './DetalleTareaSprint.module.css'
interface DetalleTareaProps {
  tarea: ITarea;
  onClose: () => void;
}

const DetalleTarea: React.FC<DetalleTareaProps> = ({ tarea, onClose }) => {
  return (
    <div className={styles.modal_fondo}>
      <div className={styles.modal_contenedor}>
        <h2 className={styles.modal_titulo}>Detalle de Tarea</h2>
      <p><span className={styles.text_b}>Titulo: </span>{tarea.titulo}</p>
      <p><span className={styles.text_b}>Descripcion: </span>"{tarea.descripcion}"</p>
      <p><span className={styles.text_b}>Fecha Limite: </span>{tarea.fechaLimite}</p>
      <p><span className={styles.text_b}>Estado: </span> {tarea.estado}</p>
      <div className={styles.modal_botones_contenedor}>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleTarea;