import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { validateSessionToken } from '$lib/server/auth';
import { getIdeas, getActividades, getPropuestas } from '$lib/data/fake-db';
import { MOCKUP_DATA } from '$env/static/private';

export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
	console.log("hello")
	try {
		const sessionToken = cookies.get('auth-session');
		console.log("hello")
		// if (!sessionToken) {
		// 	return { ideas: [], session: null };
		// }
		const {session} = await validateSessionToken(sessionToken ?? '');
		console.log({MOCKUP_DATA})
		const ideas = !MOCKUP_DATA ? await db.idea.findMany() : getIdeas(3);
		console.log(ideas);
		const actividades =  getActividades(4);
		const propuestas = !MOCKUP_DATA ? await db.propuesta.findMany() : getPropuestas(3);
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
