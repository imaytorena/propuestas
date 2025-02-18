import { fail, redirect, json } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/db';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const nombre = data.get('nombre');
		const primerApellido = data.get('primerApellido');
		const segundoApellido = data.get('segundoApellido');
		const email = data.get('email');
		const password = data.get('password');

		if (!username || !email || !password) {
			return fail(400, { message: 'Todos los campos son requeridos', missing: !username || !email || !password });
		}

		try {
			// Check if username already exists
			const existingUser = await prisma.usuario.findFirst({
				where: {
					OR: [
						{ username: String(username) },
						{ correo: String(email) }
					]
				}
			});
			if (existingUser) {
				console.error('Usuario o email ya existe');
				throw new Error('Error interno del servidor');
				// return fail(400, { message: 'Usuario o email ya existe', incorrect: true });
			}

			// Create new user
			await prisma.usuario.create({
				data: {
					username: String(username),
					nombre: String(nombre),
					primerApellido: String(primerApellido),
					segundoApellido: String(segundoApellido),
					correo: String(email),
					password: String(password), // Note: In production, use proper password hashing
				}
			});

			return { success: true };
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, { message: 'Error interno del servidor' });
		}
	}
} satisfies Actions;
