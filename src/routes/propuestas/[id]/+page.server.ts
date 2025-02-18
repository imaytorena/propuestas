import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies, params }) => {
	try {
		const sessionToken = cookies.get('auth-session');
		const {session} = await validateSessionToken(sessionToken ?? '');
        
        const propuesta = await db.propuesta.findUnique({
            where: {
                id: parseInt(params.id)
            },
			include: {
				categorias: {
					include: {
						categoria: true
					}
				}
			}
        });
        if (!propuesta) {
            throw new Error("Propuesta no encontrada");
        }
        
		console.log({propuesta, session})
		return {
            propuesta
		};
	} catch (error: Error | any) {
		console.error(error.message)
		console.error("error??")
	};
};
