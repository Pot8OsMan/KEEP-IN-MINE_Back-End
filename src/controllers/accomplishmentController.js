import { prisma } from "../config/db.js"

const getAllByUserId = async (req,res) => {
    const { userId } = req.body;

    const accomplishment = await prisma.accomplishment.findMany({
        where: { userId: userId }
    });

    if (!accomplishment) {
        return res.status(404).json({ error: "Accomplishment Not Found!" })
    }

    res.status(200).json({
        status: "success",
        data: {
            accomplishment,
        },
    });
};

const getAccomplishmemntsById = async (req,res) => {
    const { accomplishmentId, userId } = req.body;

    const accomplishment = await prisma.accomplishment.findUnique({
        where: { id: accomplishmentId, userId: userId }
    });

    if (!accomplishment) {
        return res.status(404).json({ error: "Accomplishment Not Found!" })
    }

    res.status(200).json({
        status: "success",
        data: {
            accomplishment,
        },
    });
};

const addAccomplishment = async (req,res) => {
    const { userId, title, description, detail, icon, tag } = req.body;

    const accomplishmentItem = await prisma.accomplishment.create({
        data: {
            userId,
            title,
            description,
            detail,
            icon,
            tag,
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            accomplishmentItem,
        }
    });
};

export { getAllByUserId, getAccomplishmemntsById, addAccomplishment };