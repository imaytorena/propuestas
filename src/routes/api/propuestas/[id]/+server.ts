import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export async function PUT({ cookies, params, request }) {
    try {
        const sessionToken = cookies.get('auth-session');
        const { session } = await validateSessionToken(sessionToken ?? '');
        
        const data = await request.json();
        const { nombre, descripcion, fechaEntrega, categorias } = data;

        // Actualizar la propuesta
        const updatedPropuesta = await db.propuesta.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                nombre,
                descripcion,
                fechaEntrega: new Date(fechaEntrega),
                categorias: {
                    deleteMany: {},
                    create: categorias.map((categoriaId: number) => ({
                        categoriaId
                    }))
                }
            },
            include: {
                categorias: {
                    include: {
                        categoria: true
                    }
                }
            }
        });

        return json(updatedPropuesta);
    } catch (error: Error | any) {
        console.error(error);
        return json({ error: error.message }, { status: 500 });
    }
}
