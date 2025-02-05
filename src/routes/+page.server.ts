import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';
import { getIdeas, getActividades, getPropuestas } from '$lib/data/fake-db';

export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
	try {
		const sessionToken = cookies.get('auth-session');
		const {session} = await validateSessionToken(sessionToken ?? '');
		
		const ideas = await db.idea.findMany({
			take: 3,
			include: {
				ediciones: {
					take: 3,  // Obtiene solo los últimos 3 registros
					orderBy: { createdAt: 'desc' }  // Ordena por fecha de creación descendente
				}
			}
		});
		const actividades =  getActividades(1);
		const propuestas = await db.propuesta.findMany();
		// console.log({ ideas, actividades, propuestas });
		return {
			ideas,
			actividades,
			propuestas,
			session
		};
	} catch (error: Error | any) {
		console.error(error.message)
		console.error("error??")
	};
};
