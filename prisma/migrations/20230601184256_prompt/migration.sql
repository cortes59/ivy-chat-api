-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "promptSearch" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);
