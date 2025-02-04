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
} | {
	createdAt: Date;
	updatedAt: Date;
};

export type Evaluacion = {
	buena: number;
	regular: number;
	mala: number;
};

export type Comunidad = {
	id: number;
	nombre: string;
	municipio: string;
};

export type Categoria = {
	id: number;
	nombre: string;
};

export type Actividad = {
	id: number;
	nombre: string;
	descripcion: string;
	participantes: number;
	estado: string | PropuestaEstado;
	fechaEntrega?: Date | null;
	comunidades: Comunidad[],
	categorias: Categoria[] | [];
};

export type Propuesta = {
	id: number;
	nombre: string;
	descripcion: string;
	estado: string | PropuestaEstado;
	fechaEntrega?: Date | null;
	categorias?: Categoria[];
} | {
	createdAt: Date;
	updatedAt: Date;
};

export type Like = {
	id: number;
	ideaId: number;
	usuarioId?: number | null;
	ipAddress?: string | null;
} | {
	createdAt: Date;
};

export type Edicion = {
	id: number;
	ideaId: number;
	contenido: string;
} | {
	createdAt: Date;
	updatedAt: Date;
};

export type Idea = {
	id: number;
	titulo: string;
	descripcion: string;
	likes?: Like[];
	ediciones: Edicion[];
	createdAt: Date;
	// UI state properties
	editing?: boolean;
	showingHistory?: boolean;
} | {
	createdAt: Date;
	updatedAt: Date;
};