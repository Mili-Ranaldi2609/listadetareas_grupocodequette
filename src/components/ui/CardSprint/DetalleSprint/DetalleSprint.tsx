import React from 'react';
import styles from './DetalleSprint.module.css'
import { ISprint } from '../../../../types/ISprints';
interface DetalleSprintProps {
  sprint: ISprint;
  onClose: () => void;
}

const DetalleSprint: React.FC<DetalleSprintProps> = ({ sprint, onClose }) => {
  return (
    <div className={styles.modal_fondo}>
      <div className={styles.modal_contenedor}>
        <h2 className={styles.modal_titulo}>Detalle de Sprint</h2>
      <p><span className={styles.text_b}>Nombre: </span>{sprint.nombre}</p>
      <p><span className={styles.text_b}>Fecha Inicio: </span>"{sprint.fechaInicio}"</p>
      <p><span className={styles.text_b}>Fecha Cierre: </span>{sprint.fechaCierre}</p>
      <div className={styles.modal_botones_contenedor}>
        <button onClick={onClose}>Cerrar</button>
      </div>
      
    </div>
    </div>

  );
};

export default DetalleSprint;