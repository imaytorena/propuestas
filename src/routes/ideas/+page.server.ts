import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export const load: PageServerLoad = async ({ params, cookies }: any) => {
	const sessionToken = cookies.get('auth-session');
	const {session} = await validateSessionToken(sessionToken ?? '');

	const ideas = await db.idea.findMany({
		take: 10,
		include: {
			likes: true,
			ediciones: {
			  take: 3, 
			  orderBy: { createdAt: 'desc' }
			}
		}
	});

	return {
		ideas,
		session,
	};
};
