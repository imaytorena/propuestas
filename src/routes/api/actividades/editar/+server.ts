import { db } from '$lib/db';
import { json } from '@sveltejs/kit';

export const POST = async ({ url, request }) => {
	const id = Number(url.searchParams.get('id'));
	const { nombre, descripcion, fecha_inicio, fecha_fin, estado } = await request.json();

	try {
		const result = await db.actividad.update({
			where: {
				id: id
			},
			data: {
				nombre: String(nombre),
				descripcion: String(descripcion),
				fechaInicio: fecha_inicio ? new Date(fecha_inicio) : undefined,
				fechaFin: fecha_fin ? new Date(fecha_fin) : undefined,
				estado: estado ? String(estado) : undefined,
				updatedAt: new Date()
			}
		});

		return json(result);
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al actualizar la actividad' }, { status: 400 });
	}
};
