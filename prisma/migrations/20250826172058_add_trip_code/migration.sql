/*
  Warnings:

  - You are about to drop the column `tripId` on the `Trip` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "churchName" TEXT,
    "location" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "groupSize" INTEGER,
    "description" TEXT,
    "createdByEmail" TEXT NOT NULL,
    "createdByRole" TEXT NOT NULL DEFAULT 'PARTICIPANT',
    CONSTRAINT "Trip_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "user" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("churchName", "code", "createdAt", "createdByEmail", "createdByRole", "description", "endDate", "groupSize", "id", "location", "startDate", "title", "updatedAt") SELECT "churchName", "code", "createdAt", "createdByEmail", "createdByRole", "description", "endDate", "groupSize", "id", "location", "startDate", "title", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
CREATE UNIQUE INDEX "Trip_code_key" ON "Trip"("code");
CREATE INDEX "Trip_createdByEmail_idx" ON "Trip"("createdByEmail");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
