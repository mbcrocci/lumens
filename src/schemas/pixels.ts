import { pixels } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const newPixelSchema = createInsertSchema(pixels);
export const pixelSchema = createSelectSchema(pixels);

export type NewPixel = typeof pixels.$inferInsert;
export type Pixel = typeof pixels.$inferSelect;
