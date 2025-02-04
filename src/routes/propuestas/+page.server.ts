import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const propuestas = await db.propuesta.findMany({
		orderBy: {
			id: 'desc'
		},
		include: {
			categorias: {
				include: {
					categoria: true
				}
			}
		}
	});
	
	return {
		propuestas
	};
};
