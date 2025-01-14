import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { type Edicion, ediciones, idea } from '$lib/server/db/schema';
import { max } from 'drizzle-orm';

export async function POST({ params, request, cookies }) {
	const { texto } = await request.json();

	// Obtener el último id de las ediciones
	const maxId = await db.select({ value: max(ediciones.id) }).from(ediciones);
	let edicionId = !!maxId.length && maxId[0].value ? maxId[0].value + 1 : 1;
	const newEdicion: Edicion = {
		id: edicionId,
		ideaId: parseInt(params.id),
		texto: String(texto),
		createdAt: new Date(),
		creadorId: 1
	};
	await db.insert(ediciones).values(newEdicion);
	console.log(request)
	return json({ }, { status: 201 });
}