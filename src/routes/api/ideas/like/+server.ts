import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import * as auth from '$lib/auth';

export async function GET({ url, getClientAddress }) {
	const id = url.searchParams.get('id');
	const ipAddress = getClientAddress();

	if (!id) {
		return json({ message: 'source not found' }, { status: 400 });
	}

	const idea = await db.idea.findUnique({
		where: { id: parseInt(id) },
		include: {
			likes: true
		}
	});

	if (!idea) {
		return json({ message: 'idea not found' }, { status: 404 });
	}

	// Check if this IP has already liked the idea
	const existingLike = await db.like.findFirst({
		where: {
			ideaId: parseInt(id),
			ipAddress: ipAddress
		}
	});

	if (existingLike) {
		// If like exists, remove it
		await db.like.delete({
			where: {
				id: existingLike.id
			}
		});
	} else {
		// If like doesn't exist, create it
		await db.like.create({
			data: {
				ideaId: parseInt(id),
				ipAddress: ipAddress
			}
		});
	}

	// Get updated like count
	const likeCount = await db.like.count({
		where: {
			ideaId: parseInt(id)
		}
	});

	return json({ count: likeCount }, { status: 200 });
}
