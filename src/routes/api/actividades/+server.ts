import { db } from '$lib/db';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/auth';

// Create activity
export const POST = async ({ request }) => {
	const values = await request.formData();
	const { nombre, descripcion, fecha_inicio, fecha_fin, propuesta_id } = Object.fromEntries(values.entries());

	try {
		const result = await db.actividad.create({
			data: {
				nombre: String(nombre),
				descripcion: String(descripcion),
				fechaInicio: new Date(String(fecha_inicio)),
				fechaFin: new Date(String(fecha_fin)),
				propuestaId: Number(propuesta_id),
				creadorId: 1, // TODO: Get from session
				estado: 'Pendiente',
			}
		});
		
		return json(result, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al crear la actividad' }, { status: 400 });
	}
};

// Get all activities
export const GET = async () => {
	try {
		const actividades = await db.actividad.findMany({
			include: {
				propuesta: true
			}
		});
		return json(actividades);
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al obtener las actividades' }, { status: 400 });
	}
};

// Delete activity
export const DELETE = async ({ url }) => {
	const id = Number(url.searchParams.get('id'));
	
	try {
		const result = await db.actividad.delete({
			where: {
				id: id
			}
		});
		return json(result);
	} catch (error) {
		console.error(error);
		return json({ error: 'Error al eliminar la actividad' }, { status: 400 });
	}
};
