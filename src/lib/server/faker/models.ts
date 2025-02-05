// import { faker } from '@faker-js/faker';
// or, if desiring a different locale
import { Faker, es_MX, simpleFaker } from '@faker-js/faker';
import type { Like, UsuarioColumns, Idea, Edicion, LikeColumns } from '$lib/types';

export const usuarioFaker = ({ id }: { id: number }): UsuarioColumns => {
	const { person, internet, date } = new Faker({ locale: [es_MX] });
	const nombre = person.firstName();
	const apellido1 = person.lastName();
	const apellido2 = person.lastName();
	const usuario = { firstName: nombre, lastName: apellido1 };
	return {
		id: id,
		nombre: nombre,
		primerApellido: apellido1,
		segundoApellido: apellido2,
		username: internet.username(usuario),
		correo: internet.email(usuario),
		password: internet.password({ length: 8 }),
		carreraId: simpleFaker.number.int(10),
		bio: person.bio(),
		age: 25,
		createdAt: date.soon({ days: 7 }),
		updatedAt: date.soon({ days: 7 })
	};
};

export const ideaFaker = ({ id }: { id: number }): Idea => {
	const { lorem, date } = new Faker({ locale: [es_MX] });
	return {
		id: id,
		contenido: lorem.sentence({ min: 3, max: 8 }),
		createdAt: date.recent(),
		updatedAt: date.recent(),
		ediciones: [{
			id: 1,
			contenido: lorem.sentence({ min: 3, max: 8 }),
			ideaId: id
		}]
	};
};

export const likeFaker = ({ id, ideaId, usuarioId = null }: { id: number; ideaId: number; usuarioId?: number | null }): LikeColumns => {
	const { internet, date } = new Faker({ locale: [es_MX] });
	return {
		id: id,
		ideaId: ideaId,
		usuarioId: usuarioId,
		ipAddress: internet.ip(),
		createdAt: date.recent()
	};
};

