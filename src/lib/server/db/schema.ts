// noinspection SpellCheckingInspection

import {
	date,
	datetime,
	int,
	mysqlTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
	boolean,
	json
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Tabla Carreras
export const carrera = mysqlTable('habilidades', {
	id: serial('id').primaryKey(),
	nombre: varchar('nombre', { length: 255 }).notNull(),
	centroUniversitario: varchar('centro_universitario', { length: 255 }).notNull()
});
export type Carrera = typeof carrera.$inferSelect;

// Tabla Usuarios
export let usuario = mysqlTable('usuarios', {
	id: serial('id').primaryKey(),
	nombre: varchar('nombre', { length: 255 }).notNull(),
	primerApellido: varchar('primer_apellido', { length: 255 }).notNull(),
	segundoApellido: varchar('segundo_apellido', { length: 255 }).notNull(),
	username: varchar('username', { length: 32 }).notNull().unique(),
	correo: varchar('correo', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	carreraId: int('carrera_id'),
	bio: text('bio'),
	age: int('age'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export const usuarioRelations = relations(usuario, ({one, many}) => ({
	carreraId: one(carrera),
	usuariosHabilidades: many(usuariosHabilidades),
}))
export type Usuario = typeof usuario.$inferSelect;

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	usuarioId: int('usuario_id'),
	annon: boolean('annon').default(false),
	ipAddress: varchar('ip_address', { length: 50 }),
	expiresAt: datetime('expires_at').notNull()
});
export const sessionRelations = relations(session, ({one}) => ({
	usuarioId: one(usuario),
}))
export type Session = typeof session.$inferSelect;

// Tabla Habilidades
export const habilidad = mysqlTable('habilidades', {
	id: serial('id').primaryKey(),
	nombre: varchar('nombre', { length: 255 }).notNull()
});
export const habilidadRelations = relations(usuario, ({ many}) => ({
	usuariosHabilidades: many(usuariosHabilidades),
}))

export type Habilidad = typeof habilidad.$inferSelect;

// Tabla Usuario_Habilidad (Relación N:M)
export const usuariosHabilidades = mysqlTable('usuarios_habilidades', {
		usuarioId: int('usuario_id').notNull(),
		habilidadId: int('habilidad_id').notNull()
	},
	(t) => ({
		pk: primaryKey({ columns: [t.usuarioId, t.habilidadId] }),
	})
);
export const usuariosHabilidadesRelations = relations(usuariosHabilidades, ({ one }) => ({
	usuarioId: one(usuario),
	habilidadId: one(habilidad),
}));
export type UsuariosHabilidad = typeof usuariosHabilidades.$inferSelect;

// Tabla Categorías
export const categoria = mysqlTable('categorias', {
	id: serial('id').primaryKey(),
	nombre: varchar('nombre', { length: 255 }).notNull()
});

export type Categoria = typeof categoria.$inferSelect;

// Tabla Propuestas
export const propuesta = mysqlTable('propuestas', {
	id: serial('id').primaryKey(),
	nombre: varchar('nombre', { length: 255 }).notNull(),
	descripcion: text('descripcion').notNull(),
	fechaEntrega: date('fecha_entrega'),
	creadorId: int('creador_id'),
	estado: varchar('estado', { length: 50 }).notNull().default('Iniciando'), // Pendiente, En Progreso, Finalizado
	createdAt: timestamp('created_at').notNull().defaultNow(),
});
export const propuestaRelations = relations(propuesta, ({one, many}) => ({
	creadorId: one(usuario),
	categorias: many(propuestaCategorias)
}));
export type Propuesta = typeof propuesta.$inferSelect;

// Tabla Categorias de Propuesta
export const propuestaCategorias = mysqlTable('propuesta_categorias', {
	id: serial('id').primaryKey(),
	propuestaId: int('propuesta_id').notNull(),
	categoriaId: int('categoria_id').notNull(),
});
export const propuestaCategoriasRelations = relations(propuestaCategorias, ({ one, many }) => ({
	propuestaId: one(propuesta, { fields: [propuestaCategorias.propuestaId], references: [propuesta.id] }),
	categoriaId: many(categoria)
}));

export type PropuestaCategorias = typeof propuestaCategorias.$inferSelect;


// Tabla Evaluaciones
export const evaluacion = mysqlTable('evaluaciones', {
	id: serial('id').primaryKey(),
	propuestaId: int('propuesta_id').notNull(),
	evaluadorId: int('evaluador_id').notNull(),
	calificacion: int('calificacion').notNull(), // 1 a 5
	comentario: text('comentario'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export const evaluacionRelations = relations(evaluacion, ({one}) => ({
	propuestaId: one(propuesta),
	evaluadorId: one(usuario),
}))
export type Evaluacion = typeof evaluacion.$inferSelect;

// Tabla Solicitudes (no queda muy claro para que es esta tabla)
export const solicitud = mysqlTable('solicitudes', {
	id: serial('id').primaryKey(),
	propuestaId: int('propuesta_id').notNull(),
	usuarioId: int('usuario_id').notNull(),
	estado: varchar('estado', { length: 50 }).notNull().default('pendiente'), // Pendiente, Aceptada, Rechazada
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export const solicitudRelations = relations(solicitud, ({one}) => ({
	propuestaId: one(propuesta),
	usuarioId: one(usuario),
}))
export type Solicitud = typeof solicitud.$inferSelect;


// Tabla Mensajes
export const mensaje = mysqlTable('mensajes', {
	id: serial('id').primaryKey(),
	emisorId: int('emisor_id').notNull(),
	receptorId: int('receptor_id').notNull(),
	contenido: text('contenido').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export const mensajeRelations = relations(mensaje, ({one}) => ({
	emisorId: one(usuario),
	receptorId: one(usuario),
}))
export type Mensaje = typeof mensaje.$inferSelect;

// Tabla Comunidades
export const comunidad = mysqlTable('comunidades', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  descripcion: text('descripcion').notNull(),
  imagen: varchar('imagen', { length: 255 }),
  minColaboradores: int('min_colaboradores').notNull().default(1),
  maxRepresentantes: int('max_representantes').notNull().default(1),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
export const comunidadRelations = relations(comunidad, ({ many }) => ({
  miembros: many(miembros),
  representantes: many(representantes),
	categorias: many(categoria),
}));

export type Comunidad = typeof comunidad.$inferSelect;

// Tabla Representantes de Comunidad
export const representantes = mysqlTable('representantes', {
  id: serial('id').primaryKey(),
  comunidadId: int('comunidad_id').notNull(),
  usuarioId: int('usuario_id').notNull(),
  fechaInicio: timestamp('fecha_inicio').notNull().defaultNow(),
  fechaFin: timestamp('fecha_fin'),
  activo: boolean('activo').notNull().default(true),
});

export const representantesRelations = relations(representantes, ({ one }) => ({
  comunidad: one(comunidad, { fields: [representantes.comunidadId], references: [comunidad.id] }),
  usuario: one(usuario, { fields: [representantes.usuarioId], references: [usuario.id] })
}));

export type ComunidadRepresentante = typeof representantes.$inferSelect;

// Tabla Miembros de Comunidad
export const miembros = mysqlTable('miembros', {
  id: serial('id').primaryKey(),
  comunidadId: int('comunidad_id').notNull(),
  usuarioId: int('usuario_id').notNull(),
  rol: varchar('rol', { length: 50 }).notNull().default('miembro'), // moderador, miembro
  fechaIngreso: timestamp('fecha_ingreso').notNull().defaultNow(),
  contribuciones: int('contribuciones').notNull().default(0),
});

export const miembrosRelations = relations(miembros, ({ one }) => ({
  comunidad: one(comunidad, { fields: [miembros.comunidadId], references: [comunidad.id] }),
  usuario: one(usuario, { fields: [miembros.usuarioId], references: [usuario.id] })
}));

export type ComunidadMiembro = typeof miembros.$inferSelect;

// Tabla Categorias de Comunidad
export const comunidadCategorias = mysqlTable('comunidad_categorias', {
	comunidadId: int('comunidad_id').notNull(),
	categoriaId: int('categoria_id').notNull(),
});
export const comunidadCategoriasRelations = relations(comunidadCategorias, ({ one, many }) => ({
	comunidad: one(comunidad),
	categorias: many(categoria)
}));

export type ComunidadCategorias = typeof comunidadCategorias.$inferSelect;

// Tabla Ideas
export const idea = mysqlTable('ideas', {
	id: serial('id').primaryKey(),
	likes: json('likes'), // { ips: [x.x.x.x, y.y.y.y], usuarios: [1, 2] }
	createdAt: timestamp('created_at').notNull().defaultNow()
});
export const ideaRelations = relations(idea, ({ many }) => ({
	ediciones: many(ediciones),
}));

// Tabla Categorias de Comunidad
export const ediciones = mysqlTable('ediciones', {
	id: serial('id').primaryKey(),
	ideaId: int('idea_id').notNull(),
	texto: varchar('texto', { length: 255 }).notNull(),
	creadorId: int('creador_id'), // null es anonimo
	createdAt: timestamp('created_at').notNull().defaultNow(), // null es anonimo
});
export const edicionesRelations = relations(ediciones, ({ one, many }) => ({
	ideaId: one(idea, {
		fields: [ediciones.ideaId],
		references: [idea.id],
	}),
	creadorId: one(usuario),
}));

export type Edicion = typeof ediciones.$inferSelect;
