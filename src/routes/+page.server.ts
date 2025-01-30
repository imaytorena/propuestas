import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { validateSessionToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({cookies, setHeaders}) => {
	const sessionToken = cookies.get('auth-session');
	if (!sessionToken) {
		return {
			ideas: [],
			session: null
		};
	}
	const {session} = await validateSessionToken(sessionToken);
	const ideas = await db.idea.findMany();
	return {
		ideas,
		session
	};
};
