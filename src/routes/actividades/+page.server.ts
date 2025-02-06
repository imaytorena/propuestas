import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ cookies }) => {
	const actividades = await db.actividad.findMany({
		orderBy: {
			id: 'desc'
		}
	});
	
	return {
		actividades
	};
};
