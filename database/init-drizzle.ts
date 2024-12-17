import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "~/database/schema";

export const expoDb = openDatabaseSync("db.db", { enableChangeListener: true });
export const studioDb = SQLite.openDatabaseSync("db.db", {
    enableChangeListener: true,
});
export const db = drizzle(expoDb, { schema });

