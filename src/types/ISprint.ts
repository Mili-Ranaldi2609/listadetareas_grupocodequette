import { ITarea } from "./ITareas"

export interface ISprint{
    id?: string
    fechaInicio:string
    fechaCierre:string
    nombre:string
    tareas:ITarea[]
}