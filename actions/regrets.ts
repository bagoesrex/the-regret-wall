"use server";

import { ActionResponse } from "@/types/response";
import { desc, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { regrets as regretTable } from "@/db/schema";

export type Regret = InferSelectModel<typeof regretTable> & { rotate?: number };
export type NewRegret = InferInsertModel<typeof regretTable>;

export async function getRegrets(limit = 50): Promise<ActionResponse<Regret[]>> {
  try {
    const regrets = await db
      .select()
      .from(regretTable)
      .orderBy(desc(regretTable.createdAt))
      .limit(limit);
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

export async function createRegret(data: NewRegret): Promise<ActionResponse<Regret>> {
  const trimmedMessage =
    typeof data.message === "string" ? (data.message.trim() ? data.message.trim() : null) : null;

  if (trimmedMessage && trimmedMessage.length > 120) {
    return {
      success: false,
      message: "Message must be 120 characters or less",
      data: null,
    };
  }

  const hasCanvas = typeof data.canvas === "object" && data.canvas !== null;
  const hasMessage = !!trimmedMessage;
  if (!hasCanvas && !hasMessage) {
    return {
      success: false,
      message: "Message or canvas is required",
      data: null,
    };
  }

  try {
    const [regret] = await db
      .insert(regretTable)
      .values({
        ...data,
        message: trimmedMessage,
      })
      .returning();
    return {
      success: true,
      message: "Create regret successfully",
      data: regret,
    };
  } catch {
    return {
      success: false,
      message: "Failed to create regret",
      data: null,
    };
  }
}
