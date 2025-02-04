export const Actividad = {
		id: 1,
		nombre: 'Plantar arboles',
		descripcion: "Plantar árboles es una forma de contribuir al cuidado del medio ambiente y a la conservación de la vida. Los árboles producen oxígeno, purifican el aire y ayudan a combatir el cambio climático.",
		estado: 'Activa',
		fechaEntrega: '2024-03-01',
		comunidades: [{
			id: 1, nombre: 'Centro',
            municipio: 'Guadalajara'
		},{
			id: 2, nombre: 'Americana',
            municipio: 'Guadalajara'
		},],
		categorias: [
            { nombre: 'Presencial', id: 1 },
            { nombre: 'Sustenabilidad', id: 2 },
            { nombre: 'Sustentabilidad', id: 3 }
        ],       
}

// export const Usuario = {
// 	id: 1;
// 	nombre: '',
// 	primerApellido: '',
// 	segundoApellido: '',
// 	username: '',
// 	correo: '',
// 	password: '',
// 	carreraId?: 1;
// 	likes?: Like[];
// 	ediciones?: Edicion[];
// 	bio?: '',
// 	age?: 1;
// }

export const Propuesta = {
	id: 1,
	nombre: 'Cooperación para pipas en caso de escasez de agua',
	descripcion: 'Descripcion para la propuesta Cooperación para pipas en caso de escasez de agua',
	estado: 'Iniciando',
	fechaEntrega: new Date(),
	categorias: [
		{ id: 1, nombre: 'CUCEI' },
		{ id: 2, nombre: 'Alumnos' },
		{ id: 3, nombre: 'Actualidad' }
	],
};

export const Idea = {
	id: 1,
	titulo: 'Idea ejemplo (mockup)',
	descripcion: 'Mockup ejemplo',
	likes: [
		{id: 1, ideaId: 1, usuarioId: null, ipAddress: '10.10.10.20'},
		{id: 2, ideaId: 1, usuarioId: 1, ipAddress: null},
		{id: 3, ideaId: 1, usuarioId: 1, ipAddress: null}
	],
	ediciones: [
		{id: 1, ideaId: 1, contenido: 'Idea ejemplo (mockup)'},
		{id: 2, ideaId: 1, contenido: 'Idea ejemplo'},
		{id: 3, ideaId: 1, contenido: 'Idea'},
	],
	createdAt: new Date(),
};

