import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ params, cookies }: any) => {
	const ideas = await db.idea.findMany({
		include: {
			likes: true,
			ediciones: {
			  take: 3, 
			  orderBy: { createdAt: 'desc' }
			}
		}
	});

	return {
		ideas
	};
};
