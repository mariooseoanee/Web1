import type { DEPORTES, CATEGORIAS, EntradaInscripcion, DatosInscripcion, EquipoServidor, } from "../esquemas/esquema";

export type { EntradaInscripcion, DatosInscripcion, EquipoServidor };
export type Deporte = (typeof DEPORTES)[number];
export type Categoria = (typeof CATEGORIAS)[number];

export interface FiltrosEquipos {
    busqueda?: string;
    deporte?: Deporte | "todos";
}
