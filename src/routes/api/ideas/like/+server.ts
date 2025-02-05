import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import * as auth from '$lib/auth';

export async function GET({ url, getClientAddress }) {
	// Es necesario que conozcamos al usuario (generamos una session de una vez)
	// TODO: validar los usuarios que dan like
	const id = url.searchParams.get('id');
	const ipAddress = getClientAddress();

	if (!id) {
		return json({ message: 'source not found' }, { status: 400 });
	}
	console.log(id);

	const idea = await db.idea.findUnique({
		where: { id: parseInt(id) }
	});

	if (!idea) {
		return json({ message: 'idea not found' }, { status: 404 });
	}

	let likesArray = idea.likes ? JSON.parse(String(idea.likes)) : [];
	const index = likesArray.indexOf(ipAddress);
	
	if (index !== -1) {
		likesArray.splice(index, 1);
	} else {
		likesArray.push(ipAddress);
	}

	await db.idea.update({
		where: { id: parseInt(id) },
		data: { likes: JSON.stringify(likesArray) }
	});

	// get likes array and toggle ip or user
	// insert into arrays new values
	// await db.insert(ediciones).values(newEdicion);
	return json({ count: likesArray.length }, { status: 201 });
}
