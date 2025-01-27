// import { PrismaClient } from '@prisma/client'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { DATABASE_URL } from '$env/static/private';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
}).$extends(withAccelerate());

export default prisma;