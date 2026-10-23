import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const creatorId = "e3a5f9e3-a7f0-4f22-b21c-f687136fd2aa"

const goals = [
    {
        userId: creatorId,
        title: "Learn Mandarin",
        description: "Study until I can master HSK3, vocabulary, writting and reading.",
        targetDate: "2027-02-01T00:00:00Z",
        status: "PLANNED",
        tasks: {
            create: [
                { title: "Read", userId: creatorId },
                { title: "Write", userId: creatorId },
                { title: "Speak", userId: creatorId },
                { title: "Define", userId: creatorId }
            ]
        }
    },
    {
        userId: creatorId,
        title: "Finish Game Development",
        description: "Realize your own ideas and create instead of sitting on it until you forget like you always do.",
        targetDate: "2026-11-25T00:00:00Z",
        status: "PLANNED",
        tasks: {
            create: [
                { title: "List ideas", userId: creatorId },
                { title: "build project", userId: creatorId },
                { title: "Coding 101", userId: creatorId },
                { title: "Advanced mechanics", userId: creatorId },
                { title: "play-test", userId: creatorId }
            ]
        }
    }
];

const main = async () => {
    console.log("Seeding Goals List...");

    for(const goal of goals) {
        await prisma.goal.create({
            data: goal,
        });

        console.log(`Created goals list: ${goal.title}`);
    }

    console.log("Seeding Completed!");
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});