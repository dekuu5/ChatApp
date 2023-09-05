-- AlterTable
ALTER TABLE "Friends" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
