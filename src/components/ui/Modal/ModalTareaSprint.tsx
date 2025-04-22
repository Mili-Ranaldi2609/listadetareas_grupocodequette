import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Modal.module.css"
import { ITarea } from "../../../types/ITareas"
import { useSprint } from "../../../hooks/useSprint";

type IModal = {
    handleCloseModal: VoidFunction
    idSprint: string
    tareaSeleccionada: ITarea | null
}

const initialState: ITarea = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: ""
}

export const ModalTareaSprint: FC<IModal> = ({ handleCloseModal, idSprint, tareaSeleccionada }) => {
    const [formValues, setFormValues] = useState<ITarea>(initialState)
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const { addTaskToSprint, updateTaskInSprint } = useSprint()

    useEffect(() => {
        if (tareaSeleccionada) {
            setFormValues(tareaSeleccionada)
        } else {
            setFormValues(initialState)
        }
    }, [tareaSeleccionada])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (tareaSeleccionada && idSprint) {
            // ✅ Usar los datos del formulario actualizado
            updateTaskInSprint(idSprint, formValues);
        } else {
            addTaskToSprint(idSprint, { ...formValues });
        }
        setTareaActiva(null)
        handleCloseModal()
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contendPopUp}>
                <div>
                    <h3>{tareaSeleccionada ? "Editar Tarea" : "Crear Tarea"}</h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        <input
                            onChange={handleChange}
                            value={formValues.titulo}
                            type="text"
                            required
                            autoComplete="off"
                            placeholder="Ingrese el Titulo"
                            name="titulo"
                        />
                        <textarea
                            onChange={handleChange}
                            value={formValues.descripcion}
                            placeholder="Ingrese una descripción"
                            required
                            name="descripcion"
                        />
                        <input
                            onChange={handleChange}
                            value={formValues.fechaLimite}
                            type="date"
                            required
                            autoComplete="off"
                            name="fechaLimite"
                        />
                        <select
                            name="estado"
                            value={formValues.estado}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en proceso">En Proceso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>
                    <div className={styles.buttonCard}>
                        <button className={styles.button1} onClick={handleCloseModal}>Cancelar</button>
                        <button className={styles.button2} type="submit">
                            {tareaSeleccionada ? "Editar Tarea" : "Crear Tarea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
