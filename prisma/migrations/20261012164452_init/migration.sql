-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "referencia" TEXT,
    "contato" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rotas" (
    "id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "horario_saida" TIME NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paradas_da_rota" (
    "id" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "tempo_estimado_min" INTEGER NOT NULL,
    "rota_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "paradas_da_rota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paradas_da_rota_rota_id_ordem_key" ON "paradas_da_rota"("rota_id", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "paradas_da_rota_rota_id_cliente_id_key" ON "paradas_da_rota"("rota_id", "cliente_id");

-- AddForeignKey
ALTER TABLE "paradas_da_rota" ADD CONSTRAINT "paradas_da_rota_rota_id_fkey" FOREIGN KEY ("rota_id") REFERENCES "rotas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paradas_da_rota" ADD CONSTRAINT "paradas_da_rota_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
