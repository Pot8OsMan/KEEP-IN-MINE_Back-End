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
    const { userId, title, description, targetDate, status } = req.body;

    // Ensure goal exists
    const goal = await prisma.goal.findUnique({
        where: { id: req.params.id, userId: userId },
    });

    if (!goal) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    if (goal.userId !== req.user.id) {
        return res
            .status(403)
            .json({error: "Not allowed to update this goal."});
    }

    const goalItem = await prisma.goal.update({
        where: {
            id: req.params.id,
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
        message: "Goal updated successfully",
        data: {
            goalItem,
        }
    });
};

const removeGoalById = async (req, res) => {
    const goalItem = await prisma.goal.findUnique({
        where: { id: req.params.id }
    });

    if (!goal) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    if (goalItem.userId !== req.user.id) {
        return res
            .status(403)
            .json({error: "Not allowed to remove this goal."});
    }

    await prisma.goal.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Goal removed successfully.",
    });
}

export { getGoalByUserId, getGoalById, updateGoalById, removeGoalById };