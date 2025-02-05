import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export const load: PageServerLoad = async ({ params, cookies }: any) => {
	// TODO: obtener las propuestas a las que participa
    const propuestas = await db.propuesta.findMany({
        
    });

    // TODO: obtener las actividades a las que participa
    const actividades = await db.actividad.findMany({
        
    });

	return {
        actividades,
		propuestas
	};
};
