import { UUID } from "@/utils";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pixels = sqliteTable("pixels", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => UUID()),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  code: text("code").notNull(),
});
