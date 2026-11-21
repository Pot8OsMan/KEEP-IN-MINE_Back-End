import { z } from "zod";

const addTaskToGoalSchema = z.object({
    goalId: z.string().uuid(),
    userId: z.string().uuis(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum([
        "URGENT", "HIGH", "MEDIUM", "LOW", "TRIVIAL", {
            error: () => ({
                message: "Priority must be one of: URGENT, HIGH, MEDIUM, LOW, TRIVIAL",
            }),
        }]).optional(),
    status: z.enum([
        "PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED", {
            error: () => ({
                message: "Status must be one of: PLANNED, IN_PROGRESS, COMPLETED, CANCELLED",
            }),
        }]).optional(),
});

export { addTaskToGoalSchema };