// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from '$env/dynamic/private';

const databaseUrl = env.DATABASE_URL;

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: databaseUrl
		}
	}
});
// TODO: Only production	
// .$extends(withAccelerate());

export default prisma;