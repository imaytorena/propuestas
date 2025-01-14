import { db } from '$lib/server/db';
import { propuesta } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const POST = async ({ request }) => {
	const { nombre, descripcion } = await request.json();

	const result = await db.insert(propuesta).values({
		nombre: String(nombre),
		descripcion: String(descripcion),
		creadorId: 1, // TODO: Get from session
		createdAt: new Date(),
		updatedAt: new Date()
	}).$returningAll();

	return json(result[0], { status: 201 });
};
