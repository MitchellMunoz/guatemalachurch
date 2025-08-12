-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "merchant" TEXT NOT NULL,
    "dateOfPurchase" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "memo" TEXT,
    "upload" TEXT,
    "categoryTypeId" INTEGER,
    "expenseTypeId" INTEGER,
    CONSTRAINT "Expense_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "CategoryType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Expense_expenseTypeId_fkey" FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("amount", "categoryTypeId", "createdAt", "currency", "dateOfPurchase", "expenseTypeId", "id", "memo", "merchant", "method", "updatedAt", "upload") SELECT "amount", "categoryTypeId", "createdAt", "currency", "dateOfPurchase", "expenseTypeId", "id", "memo", "merchant", "method", "updatedAt", "upload" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
