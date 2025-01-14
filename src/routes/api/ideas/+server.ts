import { db } from '$lib/server/db';
import { type Edicion, ediciones, idea } from '$lib/server/db/schema';
import { desc, max } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const POST = async ({ params, request, cookies }) => {
	const { texto } = await request.json();

	const ideaRow = await db.insert(idea).values({}).$returningId();

	const maxId = await db.select({ value: max(ediciones.id) }).from(ediciones);
	let edicionId = !!maxId.length && maxId[0].value ? maxId[0].value + 1 : 1;
	const newEdicion: Edicion = {
		id: edicionId,
		ideaId: ideaRow[0].id,
		texto: String(texto),
		createdAt: new Date(),
		creadorId: 1
	};
	await db.insert(ediciones).values(newEdicion);

	return json({ id: ideaRow[0].id, texto: String(texto), likes: 0 }, { status: 201 });
};
