/*
  Warnings:

  - You are about to drop the column `likes` on the `ideas` table. All the data in the column will be lost.
  - You are about to drop the column `propuesta_id` on the `likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idea_id,ip_address,usuario_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idea_id` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_propuesta_id_fkey";

-- DropIndex
DROP INDEX "likes_propuesta_id_ip_address_key";

-- AlterTable
ALTER TABLE "ideas" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "propuesta_id",
ADD COLUMN     "idea_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "likes_idea_id_ip_address_usuario_id_key" ON "likes"("idea_id", "ip_address", "usuario_id");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
