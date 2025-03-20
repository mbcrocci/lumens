import { env } from "@/env";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ??
//   createClient({
//   });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(env.DB_FILE_NAME, { schema });
