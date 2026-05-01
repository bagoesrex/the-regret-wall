import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema: schema });

const regretTable = schema.regrets;

async function main() {
  const regret: typeof regretTable.$inferInsert = {
    type: "text",
    canvas: null,
    message:
      "I spent 3 years in a job I hated because I was too scared to leave. The day I finally quit was the best decision I ever made.",
    color: "#c4947a",
  };

  await db.insert(regretTable).values(regret);
  console.log("New regret created!");

  const regrets = await db.select().from(regretTable);
  console.log("Getting all regrets from the database: ", regrets);
}

main();
