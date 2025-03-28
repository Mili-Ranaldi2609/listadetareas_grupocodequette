import { Backlog } from "../ui/Backlog/Backlog";
import { Header } from "../ui/Header/Header";
import { Sprint } from "../ui/Sprint/Sprint";
import styles from"./TareasScreen.module.css"
export const TareaScreen = () => {
  return (
    <div className={styles.tarea_container}>
      <Header />
      <div className={styles.contenido}>
        <div className={styles.sprint_menu}>
          <Sprint />
        </div>
        <div className={styles.backlog}>
          <Backlog />
        </div>
      </div>
    </div>
  );
};
