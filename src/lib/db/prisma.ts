import { PrismaClient } from '@prisma/client'
import { env } from '$env/dynamic/private';

const databaseUrl = env.DATABASE_URL;

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: databaseUrl
		}
	}
});

export default prisma;