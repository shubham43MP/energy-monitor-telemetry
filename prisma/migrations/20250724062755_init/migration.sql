-- CreateTable
CREATE TABLE "Telemetry" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "energyWatts" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);
