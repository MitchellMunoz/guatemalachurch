-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "groupSize" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TripRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "registrationType" TEXT NOT NULL DEFAULT 'INDIVIDUAL',
    "tripId" TEXT,
    CONSTRAINT "TripRegistration_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TripRegistration" ("createdAt", "id", "registrationType", "updatedAt") SELECT "createdAt", "id", "registrationType", "updatedAt" FROM "TripRegistration";
DROP TABLE "TripRegistration";
ALTER TABLE "new_TripRegistration" RENAME TO "TripRegistration";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
