import { db } from '$lib/server/db';
import { propuesta } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const POST = async ({ url, request }) => {
	const id = Number(url.searchParams.get('id'));
	const { nombre, descripcion } = await request.json();

	const result = await db
		.update(propuesta)
		.set({
			nombre: String(nombre),
			descripcion: String(descripcion),
			updatedAt: new Date()
		})
		.where(eq(propuesta.id, id))
		.$returningAll();

	return json(result[0]);
};
