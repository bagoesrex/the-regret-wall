import { pgTable, text, jsonb, timestamp, integer } from "drizzle-orm/pg-core";

export const regrets = pgTable("regrets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: text("type").notNull(),
  canvas: jsonb("canvas"),
  message: text("message"),
  color: text("color").default("#ccc"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  views: integer("views").default(0),
});
