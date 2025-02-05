import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import { validateSessionToken } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
	try {
		const sessionToken = cookies.get('auth-session');
		const {session} = await validateSessionToken(sessionToken ?? '');
		
        // const comunidades = await db.comunidad.findMany();
        let comunidades = [{
            id: 1,
            nombre: 'Innovación Tecnológica',
            descripcion: 'Comunidad dedicada a compartir y desarrollar proyectos innovadores en tecnología.',
            imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
            categoria: 'Tecnología',
            miembros: 250,
            minColaboradores: 5,
            maxRepresentantes: 3,
            representantes: [{
              id: '1',
              nombre: 'Ana García'
            }, {
              id: '2',
              nombre: 'Carlos Ruiz'
            }]
          }, {
            id: 2,
            nombre: 'Desarrollo Sustentable',
            descripcion: 'Espacio para propuestas y proyectos enfocados en la sustentabilidad y el medio ambiente.',
            imagen: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
            categoria: 'Medio Ambiente',
            miembros: 180,
            minColaboradores: 5,
            maxRepresentantes: 3,
            representantes: [{
              id: '3',
              nombre: 'María Sánchez'
            }]
          }, {
            id: '3',
            nombre: 'Educación Digital',
            descripcion: 'Comunidad para compartir recursos y proyectos educativos digitales.',
            imagen: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
            categoria: 'Educación',
            miembros: 320,
            minColaboradores: 5,
            maxRepresentantes: 3,
            representantes: [{
              id: '4',
              nombre: 'Juan Pérez'
            }, {
              id: '5',
              nombre: 'Laura Torres'
            }]
          }];
		// console.log({ ideas, actividades, propuestas });
		return {
            comunidades,
			session
		};
	} catch (error: Error | any) {
		console.error(error.message)
		console.error("error??")
	};
};
