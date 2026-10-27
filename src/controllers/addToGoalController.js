import { prisma } from '../config/db'

const addTaskToGoal = async (req,res) => {
    const { goalId, userId, title, description, status, priority, dueAt } = req.body;

    // Ensure goal exists
    const goal = await prisma.goal.findUnique({
        where: { id: goalId },
    });

    if (!goal) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    const taskItem = await prisma.task.create({
        data: {
            userId,
            goalId,
            title,
            description,
            status: status || "PLANNED",
            priority: priority || "TRIVIAL"
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            taskItem,
        }
    });
};