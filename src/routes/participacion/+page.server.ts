import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export const load: PageServerLoad = async ({ params, cookies }: any) => {
	// TODO: obtener las propuestas a las que participa
    let propuestas = await db.propuesta.findMany({});
    propuestas = propuestas.map((p: any) => ({ ...p, tipo: 'propuesta' }));
    let actividades = await db.actividad.findMany({});
    actividades = actividades.map((a: any) => ({ ...a, tipo: 'actividad' }));


	return {
        participaciones: [...propuestas, ...actividades]
	};
};
