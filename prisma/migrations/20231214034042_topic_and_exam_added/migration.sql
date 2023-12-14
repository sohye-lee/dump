/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - Added the required column `examId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "question" TEXT NOT NULL,
    "topic" TEXT,
    "examId" INTEGER NOT NULL,
    CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
