/*
  Warnings:

  - Added the required column `implementation_value` to the `amendment_modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month_value` to the `amendment_modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "amendment_modules" ADD COLUMN     "implementation_value" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "month_value" DECIMAL(65,30) NOT NULL;
