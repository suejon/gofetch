import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as auth from "./schema/auth";
import * as main from "./schema/main";
export const schema = { ...auth, ...main };
export { mySqlTable as tableCreator } from "./schema/_table";
export * from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (!process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("DATABASE_AUTH_TOKEN is not set");
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client, { schema: schema });
