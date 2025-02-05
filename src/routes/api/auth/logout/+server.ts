import { json } from '@sveltejs/kit';
import { deleteSessionTokenCookie } from '$lib/auth';

export const POST = async ({ params, request, cookies }) => {
	try {
        const sessionToken = cookies.get('auth-session');
        if (!sessionToken) {
            return json({
                success: false,
                session: null
            }, { status: 400 });
        }
        await deleteSessionTokenCookie(cookies);
		return json({ 
            success: true,
            session: null
		}, { status: 201 });
		
	} catch (error) {
		console.error(error);
		return json({ 
			error: "Hubo un error"
		}, { status: 400 });
	}
};
