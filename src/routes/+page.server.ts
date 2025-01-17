import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const ideas = await db.idea.findMany();

	return {
		ideas
	};
};
