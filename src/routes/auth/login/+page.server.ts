import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/db';
import { generateSessionToken, sessionCookieName, setSessionTokenCookie } from '$lib/auth';
import { verifyPasswordHash } from '$lib/auth/password'; 
import { nuevaSession } from '$lib/emails/resources/auth';


export const actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const ipAddress = getClientAddress();

		if (!username || !password) {
			return fail(400, { message: 'Usuario o contraseña son requeridos', missing: !username || !password });
		}

		try {
			// Check if user exists
			const usuario = await prisma.usuario.findFirst({
				where: {
					username: String(username)
				}
			});
			if (!usuario) {
				return fail(400, { message: 'Credenciales incorrectas', incorrect: true });
			}
			const passwordMatch = await verifyPasswordHash(usuario.password, String(password));

			if (!usuario || !passwordMatch) {
				return fail(400, { message: 'Credenciales incorrectas', incorrect: true });
			}

			const token = generateSessionToken();
			await prisma.session.create({
				data: {
					id: token,
					usuarioId: usuario.id,
					annon: false,
					ipAddress,
					expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
				}
			});

			// setSessionTokenCookie(cookies, token, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
			await cookies.set('auth-session', token, {
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict'
			});

			await nuevaSession(usuario.correo, usuario);
			return { success: true, usuario: usuario.nombre };
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, { message: 'Error interno del servidor', error });
		}
	}
} satisfies Actions;
