-- DropIndex
DROP INDEX "Task_userId_goalId_key";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "completedAt" DROP NOT NULL;
