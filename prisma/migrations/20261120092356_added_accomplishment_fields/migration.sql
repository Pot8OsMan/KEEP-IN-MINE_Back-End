/*
  Warnings:

  - Added the required column `detail` to the `Accomplishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Accomplishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Accomplishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accomplishment" ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;
