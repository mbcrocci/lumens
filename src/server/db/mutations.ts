import { NewPixel } from "@/schemas/pixels";
import "server-only";
import { db } from "./db";
import { pixel_readings, pixels } from "./schema";
import { eq } from "drizzle-orm";

const DB_MUTATIONS = {
  createPixel: async (p: NewPixel) => {
    const rows = await db.insert(pixels).values(p).returning();
    return rows[0];
  },

  updatePixelCode: async (id: string, code: string) => {
    await db.update(pixels).set({ code }).where(eq(pixels.id, id));
  },

  createPixelReading: async (pixelId: string, data: string) => {
    await db.insert(pixel_readings).values({ pixel_id: pixelId, data });
  },
};

export default DB_MUTATIONS;
