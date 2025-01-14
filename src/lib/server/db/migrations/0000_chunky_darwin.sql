CREATE TABLE `habilidades` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	CONSTRAINT `habilidades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categorias` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	CONSTRAINT `categorias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comunidades` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`imagen` varchar(255),
	`min_colaboradores` int NOT NULL DEFAULT 1,
	`max_representantes` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comunidades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comunidad_categorias` (
	`comunidad_id` int NOT NULL,
	`categoria_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ediciones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`idea_id` int NOT NULL,
	`texto` varchar(255) NOT NULL,
	`creador_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ediciones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `evaluaciones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`propuesta_id` int NOT NULL,
	`evaluador_id` int NOT NULL,
	`evaluado_id` int NOT NULL,
	`calificacion` int NOT NULL,
	`comentario` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `evaluaciones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ideas` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`likes` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ideas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mensajes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`emisor_id` int NOT NULL,
	`receptor_id` int NOT NULL,
	`contenido` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mensajes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `miembros` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`comunidad_id` int NOT NULL,
	`usuario_id` int NOT NULL,
	`rol` varchar(50) NOT NULL DEFAULT 'miembro',
	`fecha_ingreso` timestamp NOT NULL DEFAULT (now()),
	`contribuciones` int NOT NULL DEFAULT 0,
	CONSTRAINT `miembros_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `propuestas` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`descripcion` text NOT NULL,
	`fecha_entrega` date,
	`creador_id` int,
	`estado` varchar(50) NOT NULL DEFAULT 'pendiente',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `propuestas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `propuesta_categorias` (
	`propuesta_id` int NOT NULL,
	`categoria_id` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `representantes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`comunidad_id` int NOT NULL,
	`usuario_id` int NOT NULL,
	`fecha_inicio` timestamp NOT NULL DEFAULT (now()),
	`fecha_fin` timestamp,
	`activo` boolean NOT NULL DEFAULT true,
	CONSTRAINT `representantes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`usuario_id` int,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `solicitudes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`propuesta_id` int NOT NULL,
	`usuario_id` int NOT NULL,
	`estado` varchar(50) NOT NULL DEFAULT 'pendiente',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `solicitudes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`primer_apellido` varchar(255) NOT NULL,
	`segundo_apellido` varchar(255) NOT NULL,
	`username` varchar(32) NOT NULL,
	`correo` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`carrera_id` int,
	`bio` text,
	`age` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuarios_username_unique` UNIQUE(`username`),
	CONSTRAINT `usuarios_correo_unique` UNIQUE(`correo`)
);
--> statement-breakpoint
CREATE TABLE `usuarios_habilidades` (
	`usuario_id` int NOT NULL,
	`habilidad_id` int NOT NULL,
	CONSTRAINT `usuarios_habilidades_usuario_id_habilidad_id_pk` PRIMARY KEY(`usuario_id`,`habilidad_id`)
);
