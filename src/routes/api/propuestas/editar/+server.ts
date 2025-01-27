import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export const POST = async ({ url, request }) => {
	const id = Number(url.searchParams.get('id'));
	const { nombre, descripcion } = await request.json();

	const result = await prisma.propuesta.update({
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
