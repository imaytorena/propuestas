import { prisma } from '$lib/server/prisma';
import { usuarioFaker } from '$lib/server/faker/models';

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
