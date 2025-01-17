import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const POST = async ({ request }) => {
	const { nombre, descripcion } = await request.json();

	const result = await db.propuesta.create({
		data: {
			nombre: String(nombre),
			descripcion: String(descripcion),
			creadorId: 1, // TODO: Get from session
			estado: 'Iniciando'
		}
	});

	return json(result, { status: 201 });
};
