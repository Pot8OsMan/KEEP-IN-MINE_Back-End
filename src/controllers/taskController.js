import { prisma } from "../config/db.js"

const getAllTaskByUserId = async (req,res) => {
    const { userId } = req.body;

    // Ensure goal exists
    const task = await prisma.task.findMany({
        where: { userId: userId },
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
    const { goalId, userId, title, description, status, priority, dueAt } = req.body;

    // Ensure goal exists
    const task = await prisma.task.findUnique({
        where: { id: req.params.id, goalId: goalId, userId: userId },
    });

    if (!task) {
        return res.status(404).json({ error: "Task Not Found!" })
    }

    if (task.userId !== req.user.id) {
        return res
            .status(403)
            .json({error: "Not allowed to update this task."});
    }

    const taskItem = await prisma.task.update({
        where: {
            id: req.params.id,
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

const removetaskById = async (req, res) => {
    const taskItem = await prisma.task.findUnique({
        where: { id: req.params.id }
    });

    if (!taskItem) {
        return res.status(404).json({ error: "Task Not Found!" })
    }

    if (taskItem.userId !== req.user.id) {
        return res
            .status(403)
            .json({error: "Not allowed to remove this task."});
    }

    await prisma.task.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Task removed successfully.",
    });
}

export { getAllTaskByUserId, getTaskById, updateTaskByGoalId, removetaskById };