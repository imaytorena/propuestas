import prisma from '$lib/db';
import { json } from '@sveltejs/kit';
import { db } from '$lib/db';

export const POST = async ({ url, request }) => {
	const id = Number(url.searchParams.get('id'));
	const { nombre, descripcion } = await request.json();

	const result = await db.propuesta.update({
		where: {
			id: id
		},
		data: {
			nombre: String(nombre),
			descripcion: String(descripcion),
			updatedAt: new Date()
		}
	});

	return json(result);
};
