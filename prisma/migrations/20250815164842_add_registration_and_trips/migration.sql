-- CreateTable
CREATE TABLE "Trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    "cName" TEXT,
    "pName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    "cName" TEXT,
    "pName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Trips_email_idx" ON "Trips"("email");

-- CreateIndex
CREATE INDEX "Registration_email_idx" ON "Registration"("email");
