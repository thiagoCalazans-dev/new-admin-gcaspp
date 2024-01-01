/*
  Warnings:

  - The primary key for the `modules` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_modules" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "modules";
DROP TABLE "modules";
ALTER TABLE "new_modules" RENAME TO "modules";
CREATE UNIQUE INDEX "modules_name_key" ON "modules"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
