import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { categoria, propuesta, propuestaCategorias } from '$lib/server/db/schema';
import { desc, eq, inArray } from 'drizzle-orm';

const getCategoriasByPropuestaId = async (id: number) => {
	let arrayRel = await db
		.select({ id: propuestaCategorias.categoriaId })
		.from(propuestaCategorias)
		.where(eq(propuestaCategorias.propuestaId, id));
	const categorias = await db
		.select()
		.from(categoria)
		.where(
			inArray(
				categoria.id,
				arrayRel.map((a) => a.id)
			)
		);

	return categorias;
};

export const load: PageServerLoad = async () => {
	const result = await db.query.propuesta.findMany({
		orderBy: desc(propuesta.id),
		with: {
			categorias: true
		}
	});


	let propuestas = [];
	for (let i = 0; i < result.length; i++) {

		if (!!result[i].categorias?.length) {
			const categorias = await getCategoriasByPropuestaId(result[i].id);
			propuestas.push({ ...result[i], categorias });
		} else {
			propuestas.push({ ...result[i] });
		}
	}

	return { propuestas };
};
