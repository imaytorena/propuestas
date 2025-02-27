import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { getIdeas, getActividades, getPropuestas } from '$lib/data/fake-db';

export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
	try {
		const ideas = await db.idea.findMany({
			take: 3,
			include: {
				ediciones: {
					take: 3, 
					orderBy: { createdAt: 'desc' }
				}
			}
		});
		const actividades = await db.actividad.findMany({
			take: 3,
			orderBy: { createdAt: 'desc' }
		});
		const propuestas = await db.propuesta.findMany({
			take: 3,
			orderBy: { createdAt: 'desc' }
		});
		// console.log({ propuestas });
		return {
			ideas,
			actividades,
			propuestas
		};
	} catch (error: Error | any) {
		console.error(error.message)
		console.error("error??")
	};
};
