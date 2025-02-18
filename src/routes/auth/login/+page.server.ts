import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/db';
import { generateSessionToken, sessionCookieName, setSessionTokenCookie } from '$lib/auth';
import { verifyPasswordHash } from '$lib/auth/password';

export const actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const ipAddress = getClientAddress();

		if (!username || !password) {
			return fail(400, { message: 'Username and password are required', missing: !username || !password });
		}

		try {
			// Check if user exists
			const user = await prisma.usuario.findFirst({
				where: {
					username: String(username)
				}
			});
			if (!user) {
				return fail(400, { message: 'Invalid credentials', incorrect: true });
			}
			const passwordMatch = await verifyPasswordHash(user.password, String(password));

			if (!user || !passwordMatch) {
				return fail(400, { message: 'Invalid credentials', incorrect: true });
			}

			const token = generateSessionToken();
			await prisma.session.create({
				data: {
					id: token,
					usuarioId: user.id,
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

			return {success: true};
			// throw redirect(302, '/');
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, { message: 'Internal server error' });
		}
	}
} satisfies Actions;
