import { useEffect, useState } from "react";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { CardSprint } from "../CardSprint/CardSprint";
import styles from "./Sprint.module.css"
import { useNavigate } from "react-router-dom";
import { ISprint } from "../../../types/ISprints";
import { ModalSprint } from "../Modal/ModalSprint";

export const Sprint = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [mensajeAviso, setMensajeAviso] = useState(""); 
   //seteo sprint activa
      const setSprintActiva=sprintStore((state)=>state.setSprintActiva)
      const{getSprints,sprints}=useSprint()
      useEffect(()=>{
          getSprints()
      },[])

    // Manejar clic en una Sprint
  const handleSelectSprint = (sprintId: string) => {
    setSprintActiva(sprintId);
    navigate(`/sprint/${sprintId}`);
  };
  useEffect(() => {
    const sprintIdEnUrl = window.location.pathname.split("/sprint/")[1];
    if (sprintIdEnUrl && !sprints.some((s) => s.id === sprintIdEnUrl)) {
      setMensajeAviso("Sprint eliminada. Redirigiendo al backlog...");
      setTimeout(() => {
        setMensajeAviso("");
        navigate("/Backlog");
      }, 3000);
    }
  }, [sprints, navigate]);
  
  
      //estado modal
      const [openModalSprint,setOpenModalSprint]=useState(false)
      //funcion que nos permite abrir el modal 
      const handleOpenModalEdit = (sprint: ISprint) => {
        console.log("Editando sprint:", sprint);  // 🔍 Verificar qué sprint llega aquí
        setSprintActiva(sprint); 
        setOpenModalSprint(true);
    };
    
      //funcion que nos permite cerrar el modal
      const handleCloseModal=()=>{
          setOpenModalSprint(false)
      }
    return (
      <>
            <div className={styles.sprint_container}>
              <div className={styles.buttonbacklog}>
                <button  onClick={() => navigate("/Backlog")}>
                  Backlog<span className="material-symbols-outlined">import_contacts</span></button>
              </div>
              <div className={styles.sprint_header}>
                <h1>Lista de Sprints</h1>
                <div className={styles.buttonagregarsprint}>
                  <button onClick={() => {setSprintActiva(null);  // Aseguramos que no haya sprint activa
setOpenModalSprint(true);
}}><span className="material-symbols-outlined"> add_notes </span>
</button>
                </div>
                

              </div>
               <div className={styles.containerList}>
                  {   //se muestran las tareas por pantalla
                      sprints.length>0?
                      //implementamos el card list
                      sprints.map((el)=>(<CardSprint handleOpenModalEdit={handleOpenModalEdit} sprint={el} onClick={() => handleSelectSprint(el.id)}/>)):(
                          <div>
                              <h3>No hay Sprints</h3>
                          </div>
                      )
                  }
               </div>
            </div>
           {openModalSprint && <ModalSprint handleCloseModal={handleCloseModal}/>} 
           
           </>
  
    );
  };
  