/*
  Warnings:

  - You are about to drop the column `signature_date` on the `amendments` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_amendments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL,
    "subscription_date" DATETIME NOT NULL,
    "due_date" DATETIME NOT NULL,
    "contract_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "amendments_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_amendments" ("contract_id", "created_at", "due_date", "id", "number", "subscription_date", "updated_at", "value") SELECT "contract_id", "created_at", "due_date", "id", "number", "subscription_date", "updated_at", "value" FROM "amendments";
DROP TABLE "amendments";
ALTER TABLE "new_amendments" RENAME TO "amendments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
