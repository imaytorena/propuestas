-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "propuesta_id" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "ip_address" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_propuesta_id_ip_address_key" ON "likes"("propuesta_id", "ip_address");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_propuesta_id_fkey" FOREIGN KEY ("propuesta_id") REFERENCES "propuestas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
