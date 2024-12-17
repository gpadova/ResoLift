CREATE TABLE `dayOfWeekGoal` (
	`id` text PRIMARY KEY NOT NULL,
	`goalId` text,
	`dayOfWeek` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text,
	FOREIGN KEY (`goalId`) REFERENCES `goal`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `goal` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`target` integer NOT NULL,
	`unit` text NOT NULL,
	`categoryId` integer,
	`type` text NOT NULL,
	`reminder` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`completionDate` integer,
	`updatedAt` integer,
	FOREIGN KEY (`categoryId`) REFERENCES `goalCategory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `goalCategory` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text
);
