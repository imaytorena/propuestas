import type { Cookies } from '@sveltejs/kit';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import prisma from '$lib/db';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	return encodeBase64url(bytes);
}

export async function createSession(
	token: string,
	usuarioId: number | null,
	ipAddress: string | null
) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = await prisma.session.create({
		data: {
			id: sessionId,
			usuarioId,
			annon: !usuarioId,
			ipAddress,
			expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
		}
	});
	return session;
}

export async function validateSessionToken(token: string) {
	// const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	// console.log({sessionId});
	const result = await prisma.session.findUnique({
		where: { id: token },
		include: {
			usuario: {
				select: {
					id: true,
					username: true
				}
			}
		}
	});

	if (!result || !result.usuario) {
		return { session: null, usuario: null };
	}
	const { usuario, ...session } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await prisma.session.delete({
			where: { id: session.id }
		});
		return { session: null, usuario: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		const newExpiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		const updatedSession = await prisma.session.update({
			where: { id: session.id },
			data: { expiresAt: newExpiresAt }
		});
		return { session: updatedSession, usuario };
	}

	return { session, usuario };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await prisma.session.delete({
		where: { id: sessionId }
	});
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/',
	});
}

export function deleteSessionTokenCookie(cookies: Cookies) {
	cookies.delete(sessionCookieName, {
		path: '/'
	});
}

