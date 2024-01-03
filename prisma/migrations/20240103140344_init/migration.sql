/*
  Warnings:

  - A unique constraint covering the columns `[module_id,amendment_id]` on the table `amendment_modules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "unique_contract_amendment_modules";

-- CreateIndex
CREATE UNIQUE INDEX "amendment_modules_module_id_amendment_id_key" ON "amendment_modules"("module_id", "amendment_id");
