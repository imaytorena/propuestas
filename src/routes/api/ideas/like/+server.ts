import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { type Edicion, ediciones, idea } from '$lib/server/db/schema';
import { eq, max } from 'drizzle-orm';
import { sessionCookieName, setSessionTokenCookie } from '$lib/server/auth';
import * as auth from '$lib/server/auth';

export async function GET({ url, getClientAddress }) {
	// Es necesario que conozcamos al usuario (generamos una session de una vez)
	// TODO: validar los usuarios que dan like
	const id = url.searchParams.get('id');
	const ipAddress = getClientAddress();

	if (!id) {
		return json({ message: 'source not found' }, { status: 400 });
	}
	console.log(id);

	const ideaRow = await db
		.select({ value: idea.likes })
		.from(idea)
		.where(eq(idea.id, parseInt(id)));
	let likesArray = JSON.parse(String(ideaRow[0].value)) ?? []; // [ "1.2.2.2", 20, 10 ]
	const index = likesArray.indexOf(ipAddress);
	if (index !== -1) {
		likesArray.splice(index, 1);
	} else {
		likesArray.push(ipAddress);
	}
	await db
		.update(idea)
		.set({ likes: JSON.stringify(likesArray) })
		.where(eq(idea.id, parseInt(id)));

	// get likes array and toggle ip or user
	// insert into arrays new values
	// await db.insert(ediciones).values(newEdicion);
	return json({ count: likesArray.length }, { status: 201 });
}
