import { newPixelSchema, pixelSchema } from "@/schemas/pixels";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import DB_MUTATIONS from "../db/mutations";

const app = new OpenAPIHono();

const newPixelRoute = createRoute({
  method: "post",
  path: "/pixels",
  summary: "Create a new pixel",
  description: "Creates a new pixel",
  tags: ["Pixels"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: newPixelSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: pixelSchema,
        },
      },
    },
    400: { description: "Bad request" },
    500: { description: "Internal server error" },
  },
});

app.openapi(newPixelRoute, async (c) => {
  const body = c.req.valid("json");

  const pixel = await DB_MUTATIONS.createPixel(body);

  return c.json({ pixel });
});

export default app;
