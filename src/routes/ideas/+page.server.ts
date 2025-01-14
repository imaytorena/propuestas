import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { idea } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, cookies }: any) => {
	const results = await db.query.idea.findMany({
		with: { ediciones: true },
		orderBy: desc(idea.id)
	});

	// Parse de los likes a array y extracción del último texto
	const ideas = results.map((idea) => ({
		id: idea.id,
		ediciones: idea.ediciones.map(({ id, texto, createdAt }) => ({ id, texto, createdAt })),
		likes: JSON.parse(String(idea.likes))?.length ?? 0,
		texto: idea.ediciones?.findLast((e) => e.createdAt)?.texto
	}));

	return {
		ideas
	};
};
