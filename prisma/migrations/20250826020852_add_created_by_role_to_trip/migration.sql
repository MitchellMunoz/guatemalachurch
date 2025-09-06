-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TripRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "registrationType" TEXT NOT NULL DEFAULT 'PARTICIPANT',
    "tripId" TEXT NOT NULL,
    "registrantId" TEXT NOT NULL,
    "primaryContact" TEXT NOT NULL,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    CONSTRAINT "TripRegistration_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TripRegistration_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TripRegistration" ("city", "createdAt", "dob", "id", "phone", "postal", "primaryContact", "registrantId", "registrationType", "state", "street", "tripId", "updatedAt") SELECT "city", "createdAt", "dob", "id", "phone", "postal", "primaryContact", "registrantId", "registrationType", "state", "street", "tripId", "updatedAt" FROM "TripRegistration";
DROP TABLE "TripRegistration";
ALTER TABLE "new_TripRegistration" RENAME TO "TripRegistration";
CREATE INDEX "TripRegistration_tripId_idx" ON "TripRegistration"("tripId");
CREATE INDEX "TripRegistration_registrantId_idx" ON "TripRegistration"("registrantId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
