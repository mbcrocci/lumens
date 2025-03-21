import { UUID } from "@/utils";
import { relations } from "drizzle-orm";
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
  name: text("name").notNull(),
  code: text("code").notNull(),
});

export const pixel_relations = relations(pixels, ({ many }) => ({
  readings: many(pixel_readings),
}));

export const pixel_readings = sqliteTable("pixel_readings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => UUID()),
  pixel_id: text("pixel_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  data: text("data").notNull(),
});

export const pixel_reading_relations = relations(pixel_readings, ({ one }) => ({
  pixel: one(pixels, {
    fields: [pixel_readings.pixel_id],
    references: [pixels.id],
  }),
}));
