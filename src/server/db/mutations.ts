import { NewPixel } from "@/schemas/pixels";
import "server-only";
import { db } from "./db";
import { pixels } from "./schema";

const DB_MUTATIONS = {
  createPixel: async (p: NewPixel) => {
    const rows = await db.insert(pixels).values(p).returning();
    return rows[0];
  },
};

export default DB_MUTATIONS;
