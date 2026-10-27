import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const creatorId = "01025746-001c-40b9-bcd8-849de8329841"

const goals = [
    {
        userId: creatorId,
        title: "Learn Mandarin",
        description: "Study until I can master HSK3, vocabulary, writting and reading.",
        targetDate: new Date("2027-02-01T00:00:00Z"),
        status: "PLANNED",
        tasks: {
            create: [
                { title: "Read", userId: creatorId, dueAt: new Date("2027-02-01T00:00:00Z") },
                { title: "Write", userId: creatorId, dueAt: new Date("2027-02-01T00:00:00Z") },
                { title: "Speak", userId: creatorId, dueAt: new Date("2027-02-01T00:00:00Z") },
                { title: "Define", userId: creatorId, dueAt: new Date("2027-02-01T00:00:00Z") }
            ]
        }
    },
    {
        userId: creatorId,
        title: "Finish Game Development",
        description: "Realize your own ideas and create instead of sitting on it until you forget like you always do.",
        targetDate: new Date("2026-11-25T00:00:00Z"),
        status: "PLANNED",
        tasks: {
            create: [
                { title: "List ideas", userId: creatorId, dueAt: new Date("2026-10-28T00:00:00Z") },
                { title: "build project", userId: creatorId, dueAt: new Date("2026-11-01T00:00:00Z") },
                { title: "Coding 101", userId: creatorId, dueAt: new Date("2026-11-10T00:00:00Z") },
                { title: "Advanced mechanics", userId: creatorId, dueAt: new Date("2026-11-15T00:00:00Z") },
                { title: "play-test", userId: creatorId, dueAt: new Date("2026-11-22T00:00:00Z") }
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