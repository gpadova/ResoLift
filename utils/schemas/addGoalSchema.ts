import { z } from "zod";

export const addGoalSchema = z.object({
    name: z.string({ message: "Name is required" }).min(1, { message: "Name is required" }),
    description: z.string().optional(),
    target: z.number().min(1, { message: "Target is required" }),
    category: z.string({ message: "Category is required" }),
    reminder: z.boolean(),
    unit: z.string({ message: "Unit is required" }),
    completionDate: z.date({ message: "Completion date is required" }).min(new Date(), { message: "Completion date must be in the future" }),
    days: z.object({
        monday: z.boolean(),
        tuesday: z.boolean(),
        wednesday: z.boolean(),
        thursday: z.boolean(),
        friday: z.boolean(),
        saturday: z.boolean(),
        sunday: z.boolean(),
    }),
});

export const addGoalSchemaDefaultValues = {
    name: "",
    description: "",
    target: 0,
    category: "",
    reminder: false,
    unit: "",
    completionDate: new Date(),
    days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    },
}