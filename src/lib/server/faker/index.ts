import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { usuarioFaker } from '$lib/server/faker/models';
import { max } from 'drizzle-orm';
import { usuario } from '$lib/server/db/schema';

export const bulkUsuariosWithFaker = async ({ rows }: { rows: number | undefined }) => {
	let entries = [],
		id = 0;
	const maxId = await db.select({ value: max(table.usuario.id) }).from(table.usuario);
	id = maxId ? id + 1 : 0;
	while (entries.length === (rows ?? 1)) {
		entries.push(usuarioFaker({ id }));
		id += 1;
	}
	try {
		await db.insert(table.usuario).values([]);
	} catch (err) {
		throw err;
	}
};
