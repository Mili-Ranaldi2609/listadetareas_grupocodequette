import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface IsprintStore{
    sprints: ISprint[]
    sprintActivo:ISprint|null
    setSprintActivo: (sprintActivo: ISprint|null)=>void
    setArraySprint: (arrayDeSprints: ISprint[])=>void
    agregarNuevoSprint: (nuevoSprint: ISprint)=>void
    editarUnSprint: (sprintActualizado: ISprint)=>void
    eliminarUnSprint: (idsprint: string)=>void
}
export const sprintStore=create<IsprintStore>((set)=>({
    sprints: [],
    sprintActivo:null,

    //funciones modificadoras para el array

    //agregar array de sprints
    setArraySprint:(arrayDeSprints)=> set(()=>({sprints:arrayDeSprints})),
    //agregar un sprint al array
    agregarNuevoSprint: (nuevoSprint)=> set((state)=>({sprints:[...state.sprints, nuevoSprint]})),
    //editar un sprint del array 
    editarUnSprint: (sprintEditada)=> set((state)=>{
        const arregloSprints= state.sprints.map((sprint)=>sprint.id === sprintEditada.id ? {...sprint, ...sprintEditada}: sprint)
        return {sprints: arregloSprints};
    }),
    //eliminar un sprint del array
    eliminarUnSprint: (idSprint)=> set((state)=>{
        const arregloSprint= state.sprints.filter((sprint)=>sprint.id !== idSprint)
        return {sprints: arregloSprint};
    }),
    //setear el sprint activa
    setSprintActivo:(sprintActivoIn)=> set(()=>({sprintActivo:sprintActivoIn}))
}))