import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function POST({ params, request, cookies }) {
	const { texto } = await request.json();

	const newEdicion = await db.edicion.create({
		data: {
			ideaId: parseInt(params.id),
			contenido: String(texto)
		}
	});

	return json({ }, { status: 201 });
}