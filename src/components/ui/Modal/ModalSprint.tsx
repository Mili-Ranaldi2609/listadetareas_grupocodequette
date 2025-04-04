import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import styles from "./Modal.module.css"
import { ISprint } from "../../../types/ISprints"
import { sprintStore } from "../../../store/sprintStore"
import { useSprint } from "../../../hooks/useSprint"
import { v4 as uuidv4 } from "uuid";

type IModal = {
    handleCloseModal: VoidFunction
    sprint?: ISprint | null;
}

const initialState: ISprint = {
    nombre: '',
    fechaInicio: '',
    fechaCierre: '',
    tareas: []
}

export const ModalSprint: FC<IModal> = ({ sprint,handleCloseModal }) => {
    const sprintActiva = sprintStore((state) => state.sprintActiva)
    const setSprintActiva = sprintStore((state) => state.setSprintActiva)
    const {createSprint, updateSprint } = useSprint()
    
    const [formValues, setFormValues] = useState<ISprint>(initialState)

    useEffect(() => {
        if (sprintActiva) {
            setFormValues(sprintActiva);
        } else {
            setFormValues(initialState); // Limpiar si no hay una sprint activa
        }
    }, [sprintActiva]);  // <-- Escuchar cambios en sprintActiva
    

    // Manejo de inputs y select
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (sprintActiva) {
            updateSprint(formValues);
        } else {
            createSprint({ ...formValues, id: uuidv4() });
        }
        setSprintActiva(null);  // <-- Resetear sprintActiva al guardar
        handleCloseModal();
    };
    

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contendPopUp}>
                <div>
                    <h3>{sprintActiva ? "Editar Sprint" : "Crear Sprint"} </h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        <input onChange={handleChange} value={formValues.nombre} defaultValue={sprint?.nombre || ""}type="text" required autoComplete="off" placeholder="Ingrese el Nombre" name="nombre" />
                        <input onChange={handleChange} value={formValues.fechaInicio} type="date"  placeholder="Ingrese la fecha de inicio" required name="fechaInicio"></input>
                        <input onChange={handleChange} value={formValues.fechaCierre} type="date" required autoComplete="off" name="fechaCierre" />
                    </div>
                    <div className={styles.buttonCard}>
                        <button className={styles.button1}onClick={handleCloseModal}>Cancelar</button>
                        <button className={styles.button2}
                        type="submit">{sprintActiva ? "Editar Sprint" : "Crear Sprint"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
    