import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import type { Propuesta } from '$lib/types';

export const POST = async ({ request }) => {
	const values = await request.formData();

	const { nombre, descripcion, fecha_entrega } = Object.fromEntries(values.entries());
	try {
		console.log("entro en esta peticion")
		const result = await db.propuesta.create({
			data: {
				nombre: String(nombre),
				descripcion: String(descripcion),
				fechaEntrega: new Date(),
				creadorId: 1, // TODO: Get from session
				estado: 'Iniciando',
			}
		});
		
		return json(result, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al crear la propuesta' }, { status: 400 });
	}
};
