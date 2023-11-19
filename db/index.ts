// import { Client } from "@planetscale/database";
// import { drizzle } from "drizzle-orm/planetscale-serverless";
//
import * as auth from "./schema/auth";
import * as main from "./schema/main";

export const schema = { ...auth, ...main };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
// for planetscale
// export const db = drizzle(
//   new Client({
//     url: process.env.DATABASE_URL,
//   }).connection(),
//   { schema },
// );
//
//

//local development 
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fetch",
});

export const db = drizzle(connection, { schema: schema, mode: "default" });
