import { validateSessionToken } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionToken = cookies.get('auth-session');
	const {session} = await validateSessionToken(sessionToken ?? '');

    return {
		session
	};
};
