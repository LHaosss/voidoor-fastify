-- CreateTable
CREATE TABLE "MapMetadate" (
    "id" SERIAL NOT NULL,
    "mapId" TEXT NOT NULL,
    "nodeWid" INTEGER NOT NULL,
    "nodeHei" INTEGER NOT NULL,
    "background" TEXT NOT NULL,
    "materialsUrl" TEXT NOT NULL,
    "textUrl" TEXT NOT NULL,
    "miniMapUrl" TEXT NOT NULL,
    "materials" TEXT NOT NULL,
    "privacyArrList" TEXT NOT NULL,
    "birthPoint" TEXT NOT NULL,
    "roadArr" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "teleportData" TEXT NOT NULL,
    "childrenMap" TEXT NOT NULL,
    "jsonDirectory" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "MapMetadate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MapMetadate_mapId_key" ON "MapMetadate"("mapId");

-- AddForeignKey
ALTER TABLE "MapMetadate" ADD CONSTRAINT "MapMetadate_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
