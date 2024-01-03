-- CreateTable
CREATE TABLE "amendment_modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amendment_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "amendment_modules_amendment_id_fkey" FOREIGN KEY ("amendment_id") REFERENCES "amendments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "amendment_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "unique_contract_amendment_modules" ON "amendment_modules"("module_id", "amendment_id");

-- CreateIndex
CREATE INDEX "amendment_modules_amendment_id_idx" ON "amendment_modules"("amendment_id");

-- CreateIndex
CREATE INDEX "amendment_modules_module_id_idx" ON "amendment_modules"("module_id");
