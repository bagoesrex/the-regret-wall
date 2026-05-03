import { regrets } from "@/db/schema";
import { db } from "../drizzle";
import { REGRETS_SEED } from "./regrets";

async function seed() {
  console.log("Seeding...");

  await db.insert(regrets).values(REGRETS_SEED);

  console.log("Done");
  process.exit(0);
}

seed();
