import { usuarioFaker, ideaFaker, likeFaker } from '$lib/server/faker/models';
import prisma from '../../db';

export const bulkUsuariosWithFaker = async ({ rows }: { rows: number | undefined }) => {
	let entries = [],
		id = 0;
	const maxUser = await prisma.usuario.findFirst({
		orderBy: {
			id: 'desc'
		}
	});
	id = maxUser ? maxUser.id + 1 : 0;
	while (entries.length < (rows ?? 1)) {
		entries.push(usuarioFaker({ id }));
		id += 1;
	}
	try {
		await prisma.usuario.createMany({
			data: entries
		});
	} catch (err) {
		throw err;
	}
};

export const bulkIdeasWithFaker = async ({ rows }: { rows: number | undefined }) => {
	let entries = [],
		id = 0;
	const maxIdea = await prisma.idea.findFirst({
		orderBy: {
			id: 'desc'
		}
	});
	id = maxIdea ? maxIdea.id + 1 : 0;
	while (entries.length < (rows ?? 1)) {
		entries.push(ideaFaker({ id }));
		id += 1;
	}
	try {
		await prisma.idea.createMany({
			data: entries
		});
	} catch (err) {
		throw err;
	}
};

export const bulkLikesWithFaker = async ({ rows, ideaId }: { rows: number | undefined; ideaId: number }) => {
	let entries = [],
		id = 0;
	const maxLike = await prisma.like.findFirst({
		orderBy: {
			id: 'desc'
		}
	});
	id = maxLike ? maxLike.id + 1 : 0;

	// Get some random users for authenticated likes
	const users = await prisma.usuario.findMany({
		select: { id: true },
		take: Math.floor((rows ?? 1) / 2) // Half of the likes will be from authenticated users
	});

	while (entries.length < (rows ?? 1)) {
		const userIndex : number = entries.length % (users.length + 1); // +1 to include anonymous likes
		entries.push(
			likeFaker({
				id,
				ideaId,
				usuarioId: userIndex < users.length ? users[userIndex].id : null
			})
		);
		id += 1;
	}
	try {
		await prisma.like.createMany({
			data: entries
		});
	} catch (err) {
		throw err;
	}
};
