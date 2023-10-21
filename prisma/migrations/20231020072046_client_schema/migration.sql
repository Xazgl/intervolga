-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "carNumber" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "carBrand" TEXT NOT NULL,
    "wherePassportGet" TEXT NOT NULL,
    "passportDate" TEXT NOT NULL,
    "drivers" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
