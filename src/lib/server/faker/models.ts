// import { faker } from '@faker-js/faker';
// or, if desiring a different locale
import { Faker, es_MX, simpleFaker } from '@faker-js/faker';
import * as table from '$lib/server/db/schema';
import type { Usuario } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

// const { person, internet, helpers } = faker;
export const usuarioFaker = ({ id }: { id: number }): Usuario => {
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
		createdAt: date.soon({ days: 7 })
	};
};
