import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

export const POST = async ({ params, request, cookies }) => {
	const { contenido } = await request.json();
	console.log({contenido});
	try {
		const idea = await db.idea.create({
			data: {
				contenido: String(contenido),
				ediciones: {
					create: {
						contenido: String(contenido)
					}
				}
			},
			include: {
				ediciones: true
			}
		});
	
		console.log({idea});
		return json({ 
			idea
		}, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ 
			error: "Hubo un error"
		}, { status: 400 });
	}
};
