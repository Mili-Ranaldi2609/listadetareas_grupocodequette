import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSprint } from "../../hooks/useSprint";
import { Sprint } from "../ui/Sprint/Sprint";
import styles from "./SprintDetalles.module.css";
import { ITarea } from "../../types/ITareas";
import { CardTareaSprint } from "../ui/CardTareaSprint/CardTareaSprint";

export const SprintDetail = () => {
  const { id } = useParams(); // Obtener ID de la sprint desde la URL
  const { getSprints, sprints } = useSprint();
  const [sprint, setSprint] = useState(null);
  
    //estado modal
    const [openModalTarea,setOpenModalTarea]=useState(false)
    //funcion que nos permite abrir el modal 
    const handleOpenModalEdit=(tarea:ITarea)=>{
            setOpenModalTarea(tarea)
            setOpenModalTarea(true)
    }
    //funcion que nos permite cerrar el modal
    const handleCloseModal=()=>{
        setOpenModalTarea(false)
    }
  useEffect(() => {
    if (sprints.length === 0) {
      getSprints(); // Asegura que los Sprints están cargados
    }
  }, []);

  useEffect(() => {
    const foundSprint = sprints.find((s) => s.id === id);
    setSprint(foundSprint || null);
  }, [sprints, id]);

  if (!sprint) {
    return <h2>Cargando o Sprint no encontrada...</h2>;
  }

  // Agrupar tareas por estado
  const tareasPendientes = sprint.tareas.filter((tarea) => tarea.estado === "pendiente");
  const tareasEnProgreso = sprint.tareas.filter((tarea) => tarea.estado === "en proceso");
  const tareasCompletadas = sprint.tareas.filter((tarea) => tarea.estado === "completada");

  return (
    <div className={styles.tarea_container}>
      <div className={styles.contenido}>
        <div className={styles.sprint_menu}>
          <Sprint />
        </div>
        <div className={styles.contenedorSprint}>
          <div className={styles.contenedorTitulosyBoton}>
          <div className={styles.tituloyboton}>
          <h1>Nombre de la sprint: {sprint.nombre}</h1>
          <div className={styles.buttonuevatareasprint}>
          <button>Nueva Tarea<span className="material-symbols-outlined">
new_window
</span></button>
          </div>
          </div>
          <h2>Tareas en la Sprint</h2>
          </div>
          
          <div className={styles.tareas_container}>
            {/* Sección de tareas pendientes */}
            <div className={styles.tareas_pendientes}>
              <h3>Pendientes</h3>
              {tareasPendientes.length > 0 ? (
                tareasPendientes.map((tarea) => (
                  <div key={tarea.id} className={styles.tarea_card}>
                    <CardTareaSprint key={tarea.id} tarea={tarea} handleOpenModalEdit={handleOpenModalEdit} />
                  </div>
                ))
              ) : (
                <p>No hay tareas pendientes</p>
              )}
            </div>
            {/* para hacer la division entre las columnas */}
            <div className={styles.palito}><div className={styles.circulo}></div></div>
            {/* Sección de tareas en progreso */}
            <div className={styles.tareas_en_progreso}>
              <h3>En Proceso</h3>
              {tareasEnProgreso.length > 0 ? (
                tareasEnProgreso.map((tarea) => (
                  <div key={tarea.id} className={styles.tarea_card}>
                    <CardTareaSprint key={tarea.id} tarea={tarea} handleOpenModalEdit={handleOpenModalEdit} />
                  </div>
                ))
              ) : (
                <p>No hay tareas en progreso</p>
              )}
            </div>
            {/* para hacer la division entre las columnas */}
            <div className={styles.palito}><div className={styles.circulo}></div></div>
            {/* Sección de tareas completadas */}
            <div className={styles.tareas_completadas}>
              <h3>Completadas</h3>
              {tareasCompletadas.length > 0 ? (
                tareasCompletadas.map((tarea) => (
                  <div key={tarea.id} className={styles.tarea_card}>
                    <CardTareaSprint key={tarea.id} tarea={tarea} handleOpenModalEdit={handleOpenModalEdit} />
                  </div>
                ))
              ) : (
                <p>No hay tareas completadas</p>
              )}
            </div>
          </div>
        </div>
      </div>
       {openModalTarea &&<ModalTarea handleCloseModal={handleCloseModal}/>}
    </div>
  );
};
