import { useEffect } from "react";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { CardSprint } from "../CardSprint/CardSprint";
import styles from "./Sprint.module.css"

export const Sprint = () => {
   //seteo sprint activa
      const setSprintActiva=sprintStore((state)=>state.setSprintActiva)
      const{getSprints,sprints}=useSprint()
      useEffect(()=>{
          getSprints()
      },[])
    return (
      <>
            <div className={styles.sprint_container}>
              <div>
                <button>
                  Backlog<span className="material-symbols-outlined">import_contacts</span></button>
              </div>
              <div className={styles.sprint_header}>
                <h1>Lista de Sprints</h1>
                <button><span className="material-symbols-outlined"> add_notes </span></button>
              </div>
               <div className={styles.containerList}>
                  {   //se muestran las tareas por pantalla
                      sprints.length>0?
                      //implementamos el card list
                      sprints.map((el)=>(<CardSprint
                          sprint={el}/>)):(
                          <div>
                              <h3>No hay Tareas</h3>
                          </div>
                      )
                  }
               </div>
            </div>{/* 
           {openModalSprint &&<ModalSprint handleCloseModal={handleCloseModal}/>} */}
           
           </>
  
    );
  };
  