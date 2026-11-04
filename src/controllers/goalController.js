import { prisma } from "../config/db.js"

const getGoalByUserId = async (req,res) => {
    const { userId } = req.body;

    const goal = await prisma.goal.findMany({
        where: { userId: userId }
    });

    if (!goal) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    res.status(200).json({
        status: "success",
        data: {
            goal,
        },
    });
};

const getGoalById = async (req,res) => {
    const { goalId, userId } = req.body;

    const goal = await prisma.goal.findUnique({
        where: { id: goalId, userId: userId },
        include: {
            tasks: true,
        },
    });

    if (!goal) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    res.status(200).json({
        status: "success",
        data: {
            goal,
        },
    });
};

const updateGoalById = async (req,res) => {
    const { goalId, userId, title, description, targetDate, status } = req.body;

    // Ensure goal exists
    const goal = await prisma.goal.findUnique({
        where: { id: goalId, userId: userId },
    });

    if (!goal) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    const goalItem = await prisma.goal.update({
        where: {
            id: goalId,
        },
        data: {
            title: title,
            description: description,
            targetDate: targetDate,
            status: status,
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            goalItem,
        }
    });
};

export { getGoalByUserId, getGoalById, updateGoalById };