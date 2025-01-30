import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth.js';
import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
const handleParaglide: Handle = i18n.handle();

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	console.log({sessionToken});
	if (!sessionToken) {
		event.locals.usuario = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, usuario } = await auth.validateSessionToken(sessionToken);
	console.log({session, usuario});
	if (session) {
		auth.setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event.cookies);
	}

	event.locals.usuario = usuario;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
