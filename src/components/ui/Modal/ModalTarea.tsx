import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Modal.module.css"
import { ITarea } from "../../../types/ITareas"
import { useTareas } from "../../../hooks/useTarea"
import { v4 as uuidv4 } from "uuid";
type IModal = {
    handleCloseModal: VoidFunction
}

const initialState: ITarea = {
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    estado: "" // Estado inicial vacío
}

export const ModalTarea: FC<IModal> = ({ handleCloseModal }) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva)
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const { createTarea, updateTarea } = useTareas()

    const [formValues, setFormValues] = useState<ITarea>(initialState)

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva)
    }, [])

    // Manejo de inputs y select
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    // Guardar formulario
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (tareaActiva) {
            updateTarea(formValues)
        } else {
            createTarea({ ...formValues, id: uuidv4() })
        }
        setTareaActiva(null)
        handleCloseModal()
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contendPopUp}>
                <div>
                    <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"} </h3>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        <input onChange={handleChange} value={formValues.titulo} type="text" required autoComplete="off" placeholder="Ingrese el Titulo" name="titulo" />
                        <textarea onChange={handleChange} value={formValues.descripcion} placeholder="Ingrese una descripción" required name="descripcion"></textarea>
                        <input onChange={handleChange} value={formValues.fechaLimite} type="date" required autoComplete="off" name="fechaLimite" />
                        {/* Select para Estado */}
                        <select name="estado" value={formValues.estado} onChange={handleChange} required>
                            <option value="">Selecciona un estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en proceso">En Proceso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>
                    <div className={styles.buttonCard}>
                        <button className={styles.button1}onClick={handleCloseModal}>Cancelar</button>
                        <button className={styles.button2}
                        type="submit">{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
    