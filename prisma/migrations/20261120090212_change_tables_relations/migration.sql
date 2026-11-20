-- AlterTable
ALTER TABLE "Accomplishment" ADD COLUMN     "goalId" TEXT;

-- CreateIndex
CREATE INDEX "Accomplishment_goalId_idx" ON "Accomplishment"("goalId");

-- AddForeignKey
ALTER TABLE "Accomplishment" ADD CONSTRAINT "Accomplishment_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
