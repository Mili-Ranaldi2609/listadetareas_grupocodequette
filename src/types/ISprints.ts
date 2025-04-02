import { ITarea } from "./ITareas";

export interface ISprintList {
  sprints: ISprint[]; 
}
export interface ISprint {
  id?: string; 
  nombre: string;
  fechaInicio: string; 
  fechaCierre: string; 
  tareas: ITarea[]; 
}

