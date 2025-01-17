import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const POST = async ({ params, request, cookies }) => {
	const { texto } = await request.json();

	const idea = await db.idea.create({
		data: {
			titulo: '',  
			descripcion: '',
			ediciones: {
				create: {
					contenido: String(texto)
				}
			}
		},
		include: {
			ediciones: true
		}
	});

	return json({ 
		id: idea.id, 
		texto: idea.ediciones[0].contenido, 
		likes: idea.likes || 0 
	}, { status: 201 });
};
