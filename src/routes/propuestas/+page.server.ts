import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ cookies }) => {
	
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
