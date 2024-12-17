import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const goal = sqliteTable('goal', {
    id: text().$defaultFn(() => createId()).primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    target: integer('target').notNull(),
    unit: text('unit').references(() => goalUnit.id),
    categoryId: text('categoryId').references(() => goalCategory.id),
    reminder: integer('reminder', { mode: "boolean" }).notNull(),
    createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
    completionDate: integer('completionDate', { mode: "timestamp" }),
    updatedAt: integer('updatedAt', { mode: "timestamp" }).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const goalCategory = sqliteTable('goalCategory', {
    id: text().$defaultFn(() => createId()).primaryKey(),
    name: text('name'),
    createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updatedAt').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const dayOfWeekGoal = sqliteTable('dayOfWeekGoal', {
    id: text().$defaultFn(() => createId()).primaryKey(),
    goalId: text('goalId').references(() => goal.id),
    dayOfWeek: text('dayOfWeek', { enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] }),
    createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updatedAt').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const goalRelations = relations(goal, ({ one, many }) => ({
    category: one(goalCategory, {
        fields: [goal.categoryId],
        references: [goalCategory.id],
    }),
    dayOfWeek: many(dayOfWeekGoal),
}));

export const goalUnit = sqliteTable('goalUnit', {
    id: text().$defaultFn(() => createId()).primaryKey(),
    name: text('name'),
    createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updatedAt').$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
    goalCategoryId: text('goalCategoryId').references(() => goalCategory.id),
});

export const goalUnitRelations = relations(goalUnit, ({ many, one }) => ({
    goals: many(goal),
    category: one(goalCategory, {
        fields: [goalUnit.goalCategoryId],
        references: [goalCategory.id],
    }),
}));

export const goalCategoryRelations = relations(goalCategory, ({ many }) => ({
    units: many(goalUnit),
    goals: many(goal),
}));

export type Goal = typeof goal.$inferSelect;
export type Category = typeof goalCategory.$inferSelect;
export type Unit = typeof goalUnit.$inferSelect;
