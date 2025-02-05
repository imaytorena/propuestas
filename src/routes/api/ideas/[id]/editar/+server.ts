import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function POST({ params, request, cookies }) {
	const { contenido } = await request.json();

	const idea = await db.idea.findUnique({
		where: {
			id: parseInt(params.id)
		}
	});
	if (!idea) {
		return json({ error: 'Idea no encontrada' }, { status: 404 });
	}

	if (idea.contenido === contenido) {
		return json({ error: 'El contenido no puede ser igual al actual' }, { status: 400 });
	}

	await db.idea.update({
		where: {
			id: parseInt(params.id)
		},
		data: {
			contenido: String(contenido)
		}
	});

	const newEdicion = await db.edicion.create({
		data: {
			ideaId: parseInt(params.id),
			contenido: String(contenido)
		}
	});

	return json({newEdicion}, { status: 201 });
}