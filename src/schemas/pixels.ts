import { pixels } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const newPixelSchema = z.object({
  name: z.string(),
  code: z.string(),
});
export const pixelSchema = createSelectSchema(pixels);

export type NewPixel = z.infer<typeof newPixelSchema>;
export type Pixel = typeof pixels.$inferSelect;
