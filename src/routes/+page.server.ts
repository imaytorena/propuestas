import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { validateSessionToken } from '$lib/server/auth';
import { getIdeas, getActividades, getPropuestas } from '$lib/data/fake-db';

export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
	console.log("hello")
	try {
		const sessionToken = cookies.get('auth-session');
		console.log("hello")
		// if (!sessionToken) {
		// 	return { ideas: [], session: null };
		// }
		const {session} = await validateSessionToken(sessionToken ?? '');
		
		const ideas = await db.idea.findMany();
		// console.log(ideas);
		// TODO: get from DB
		const actividades =  getActividades(4);
		const propuestas = await db.propuesta.findMany();
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
