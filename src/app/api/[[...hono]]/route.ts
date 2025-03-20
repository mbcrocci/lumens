import { OpenAPIHono } from "@hono/zod-openapi";
import { handle } from "hono/vercel";
import { apiReference } from "@scalar/hono-api-reference";
import { getBaseUrl } from "@/utils";
import pixels from "@/server/routes/pixels";

// export const runtime = "edge"; // TODO: it's faster but might be more expensive

const app = new OpenAPIHono().basePath("/api");

app.openAPIRegistry.registerComponent("securitySchemes", "apiKey", {
  type: "apiKey",
  in: "header",
  name: "X-API-KEY",
});

app.get("/docs", apiReference({ url: "/api/doc" }));
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Lumens API",
    description: "API for Lumens",
  },
  servers: [
    {
      url: getBaseUrl(),
    },
  ],
});

app.route("/pixels", pixels);

export const GET = handle(app);
export const POST = handle(app);
