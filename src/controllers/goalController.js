import { prisma } from '../config/db'

const getGoalById = async (req,res) => {
    const { goalId } = req.body;

    const goal = await prisma.goal.findUnique({
        where: { id: goalId },
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