import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { deleteSessionTokenCookie } from '$lib/server/auth';

export const load: PageServerLoad = async ({cookies, setHeaders}) => {
	const sessionToken = cookies.get('auth-session');
    if (!sessionToken) {
        return {
            success: false,
            session: null
        };
    }
	await deleteSessionTokenCookie(cookies);
	return {
        success: true,
		session: null
	};
};
