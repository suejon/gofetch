import "dotenv/config";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as auth from "./schema/auth";
import * as main from "./schema/main";
export const schema = { ...auth, ...main };
export { mySqlTable as tableCreator } from "./schema/_table";
export * from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export const db = drizzle(connection, { schema: schema, mode: "default" });
