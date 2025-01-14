// Client-side type definitions
import type { Categoria, PropuestaCategorias } from '$lib/server/db/schema';

export type PropuestaEstado = 'Iniciando' | 'En Progreso' | 'Finalizado';

export type Evaluacion = {
	buena: number;
	regular: number;
	mala: number;
};

export type Propuesta = {
	id: number;
	nombre: string;
	descripcion: string;
	estado: string | PropuestaEstado;
	fechaEntrega?: Date | null;
	categorias?: Categoria[];
};

export type Edicion = {
	id?: number;
	createdAt: Date;
	creadorId?: number | null;
	ideaId?: number;
	texto: string;
};

export type Idea = {
	id?: number;
	texto?: string | undefined;
	likes: unknown;
	editing?: boolean;
	showingHistory?: boolean;
	ediciones: Edicion[];
};
