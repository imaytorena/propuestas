export type PropuestaEstado = 'Iniciando' | 'En Progreso' | 'Finalizado';
export type Usuario = {
	id: number;
	nombre: string;
	primerApellido: string;
	segundoApellido: string;
	username: string;
	correo: string;
	password: string;
	carreraId?: number;
	likes?: Like[];
	ediciones?: Edicion[];
	bio?: string;
	age?: number;
}
export interface UsuarioColumns extends Usuario {
	likes?: LikeColumns[];
	ediciones?: EdicionColumns[];
	createdAt: Date;
	updatedAt: Date;
}

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

export type Like = {
	id: number;
	ideaId: number;
	usuarioId?: number | null;
	ipAddress: string;
};
export interface LikeColumns extends Like {
	createdAt: Date;
}

export type Edicion = {
	id: number;
	ideaId: number;
	contenido: string;
};
export interface EdicionColumns extends Edicion {
	createdAt: Date;
	updatedAt: Date;
}

export type Idea = {
	id: number;
	titulo: string;
	descripcion: string;
	likes: Like[];
	ediciones: Edicion[];
	createdAt: Date;
	// UI state properties
	editing?: boolean;
	showingHistory?: boolean;
};

export interface IdeaColumns extends Idea {
	likes?: LikeColumns[];
	ediciones?: EdicionColumns[];
	updatedAt: Date;
}