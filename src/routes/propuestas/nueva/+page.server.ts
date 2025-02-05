import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies }) => {
    const sessionToken = cookies.get('auth-session');
    const {session} = await validateSessionToken(sessionToken ?? '');
    const usuario = await db.usuario.findUnique({
        where: {
            id: session?.usuarioId
        }
    })
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    console.log({session})
	return {
        usuario    
	};
};
