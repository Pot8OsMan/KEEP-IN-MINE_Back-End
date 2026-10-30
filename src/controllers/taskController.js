import { prisma } from "../config/db.js"

const getTaskById = async (req,res) => {
    const { taskId } = req.body;

    // Ensure goal exists
    const task = await prisma.task.findUnique({
        where: { id: taskId },
    });

    if (!task) {
        return res.status(404).json({ error: "Task Not Found!" })
    }

    res.status(200).json({
        status: "success",
        data: {
            task,
        },
    });
};

const updateTaskByGoalId = async (req,res) => {
    const { taskId, goalId, userId, title, description, status, priority, dueAt } = req.body;

    // Ensure goal exists
    const task = await prisma.task.findUnique({
        where: { id: taskId, goalId: goalId, userId: userId },
    });

    if (!task) {
        return res.status(404).json({ error: "Goal Not Found!" })
    }

    const taskItem = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            title,
            description,
            status: status || "PLANNED",
            priority: priority || "TRIVIAL",

            dueAt: dueAt || null
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            taskItem,
        }
    });
};

export { getTaskById, updateTaskByGoalId };