PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_goal` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`target` integer NOT NULL,
	`unit` text,
	`categoryId` text,
	`reminder` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`completionDate` integer,
	`updatedAt` integer,
	FOREIGN KEY (`unit`) REFERENCES `goalUnit`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `goalCategory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_goal`("id", "title", "description", "target", "unit", "categoryId", "reminder", "createdAt", "completionDate", "updatedAt") SELECT "id", "title", "description", "target", "unit", "categoryId", "reminder", "createdAt", "completionDate", "updatedAt" FROM `goal`;--> statement-breakpoint
DROP TABLE `goal`;--> statement-breakpoint
ALTER TABLE `__new_goal` RENAME TO `goal`;--> statement-breakpoint
PRAGMA foreign_keys=ON;