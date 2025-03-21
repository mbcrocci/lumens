import "server-only";
import { db } from "./db";
import { pixel_readings, pixels } from "./schema";
import { eq } from "drizzle-orm";

const DB_QUERIES = {
  getPixel: async (id: string) => {
    return db.query.pixels.findFirst({ where: eq(pixels.id, id) });
  },

  getPixels: async () => db.query.pixels.findMany(),

  getPixelReadings: async (pixelId: string) => {
    return db.query.pixel_readings.findMany({
      where: eq(pixel_readings.pixel_id, pixelId),
    });
  },
};

export default DB_QUERIES;
