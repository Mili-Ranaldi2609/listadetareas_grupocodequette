import {create} from "zustand"
import { ITarea } from "../types/ITareas"

interface ITareaStore {
    tareas: ITarea[]
    tareaActiva:ITarea|null
    setTareaActiva:(tareaActiva:ITarea|null)=>void;
    setArrayTareas: (arrayDeTareas:ITarea[])=>void;
    agregarNuevaTarea: (nuevaTarea:ITarea)=>void;
    editarUnaTarea: (tareaActualizada:ITarea)=>void;
    eliminarUnaTarea: (idtarea:string)=>void;

}

export const tareaStore = create <ITareaStore>((set)=> ({
    tareas: [],
    tareaActiva:null,

    //funciones modificadoras p array
    // agregar array
    setArrayTareas:(arrayDeTareas)=> set (()=>({tareas: arrayDeTareas})),
 // agregar nueva tarea
    agregarNuevaTarea:(nuevaTarea)=> 
        set((state)=>({tareas: [...state.tareas,nuevaTarea]})),
    //editar una tareas
    editarUnaTarea: (tareaEditada) =>
        set((state) => {
            const arregloTareas = state.tareas.map((tarea)=>
            tarea.id == tareaEditada.id ? { ...tarea, ...tareaEditada}:tarea
        );
        return {tareas:arregloTareas}
    }),
    // Eliminar una tarea (corregida)
    eliminarUnaTarea: (idTarea) =>
        set((state) => ({
            tareas: state.tareas.filter((tarea) => tarea.id !== idTarea),
        })),

    // Setear una tarea activa
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn })),
}));