import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"],
});

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("DB Has Connected via Prisma");
    }
    catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1); //stop NodeJs app and tell system ended due to an error
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };