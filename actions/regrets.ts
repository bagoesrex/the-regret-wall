"use server";

import { ActionResponse } from "@/types/response";
import { InferSelectModel } from "drizzle-orm";
import { regrets } from "@/db/schema";
import { db } from "@/db/drizzle";
import { regrets as regretTable } from "@/db/schema";

export type Regret = InferSelectModel<typeof regrets>;

export async function getRegrets(limit = 50): Promise<ActionResponse<Regret[]>> {
  try {
    const regrets = await db.select().from(regretTable).limit(limit);
    return {
      success: true,
      message: "Regrets fetched successfully",
      data: regrets,
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch regrets",
      data: null,
    };
  }
}
