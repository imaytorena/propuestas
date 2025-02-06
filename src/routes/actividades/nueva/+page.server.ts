import type { Actions, PageServerLoad } from './$types';
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

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        try {
            const sessionToken = cookies.get('auth-session');
            const {session} = await validateSessionToken(sessionToken ?? '');
            const values = await request.formData();
    
            const { nombre, descripcion, categorias, fecha_entrega } = Object.fromEntries(values.entries());
            
            // console.log({nombre, descripcion, categorias, fecha_entrega});
            const categoriasResult = await db.categoria.createMany({
                data: JSON.parse(String(categorias)).map((categoria: string) => ({ nombre: categoria }))
            });
            const createdCategorias = await db.categoria.findMany({
                where: {
                    nombre: {
                        in: JSON.parse(String(categorias))
                    }
                }
            });
            console.log({createdCategorias});
            const categoriasIds = createdCategorias.map((categoria) => ({ id: categoria.id }));
            console.log({categoriasIds});
            const actividad = await db.actividad.create({
                data: {
                    nombre: String(nombre),
                    descripcion: String(descripcion),
                    fechaEntrega: new Date(String(fecha_entrega)),
                    categorias: {
                        create: categoriasIds.map(({ id }) => ({
                            categoria: {
                                connect: { id }
                            }
                        }))
                    },
                    creadorId: session?.usuarioId,
                    estado: 'Iniciando',
                }
            });
            return { success: true, actividad };
        } catch (error) {
            console.error(error);
            return { success: false };  
        }
    }   
}