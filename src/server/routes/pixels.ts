import "server-only";

import { newPixelSchema, Pixel, pixelSchema } from "@/schemas/pixels";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import DB_MUTATIONS from "../db/mutations";
import DB_QUERIES from "../db/queries";
import { Context } from "hono";
import { getBaseUrl } from "@/utils";

const app = new OpenAPIHono();

const newPixelRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create a new pixel",
  description: "Creates a new pixel",
  tags: ["Pixels"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ name: z.string() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: z.object({ pixel: pixelSchema }),
        },
      },
    },
    400: { description: "Bad request" },
    500: { description: "Internal server error" },
  },
});

app.openapi(newPixelRoute, async (c) => {
  const body = c.req.valid("json");

  const pixel = await DB_MUTATIONS.createPixel({
    name: body.name,
    code: "PLACEHOLDER",
  });

  const code = await buildPixelCode(pixel);

  await DB_MUTATIONS.updatePixelCode(pixel.id, code);
  pixel.code = code;

  console.dir(pixel);
  console.dir(code);

  return c.json({ pixel });
});

const findPixelRoute = createRoute({
  method: "get",
  path: "/:id",
  summary: "Find a pixel by ID",
  description: "Find a pixel by ID",
  tags: ["Pixels"],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: z.object({
            pixel: pixelSchema,
          }),
        },
      },
    },
    404: {
      description: "Pixel not found",
    },
    500: {
      description: "Internal server error",
    },
  },
});

app.openapi(findPixelRoute, async (c) => {
  const id = c.req.valid("param").id;

  const pixel = await DB_QUERIES.getPixel(id);
  if (!pixel) {
    return c.json({ error: "Pixel not found" }, 404);
  }

  return c.json({ pixel });
});

const listPixelsRoute = createRoute({
  method: "get",
  path: "/",
  summary: "List all pixels",
  description: "List all pixels",
  tags: ["Pixels"],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: z.object({
            pixels: z.array(pixelSchema),
            metadata: z.object({
              count: z.number(),
            }),
          }),
        },
      },
    },
  },
});
app.openapi(listPixelsRoute, async (c) => {
  const pixels = await DB_QUERIES.getPixels();

  return c.json({
    pixels,
    metadata: { count: pixels.length },
  });
});

const ingestRoute = createRoute({
  method: "get",
  path: "/:id/ingest",
  summary: "Ingest a reading",
  description: "Ingest a reading",
  tags: ["Pixels"],
  request: {
    params: z.object({
      id: z.string(),
    }),
    query: z.object({
      id: z.string().optional(),
      ev: z.string().optional(),
    }),
  },
  responses: {
    204: {
      description: "Success",
    },
  },
});

app.openapi(ingestRoute, async (c) => {
  const id = c.req.valid("param").id;

  const pixel = await DB_QUERIES.getPixel(id);
  if (!pixel) {
    console.error("Pixel not found");
    return c.json({ error: "Pixel not found" }, 404);
  }

  const data = await dataFromContext(c);

  await DB_MUTATIONS.createPixelReading(id, data);

  return c.json({ message: "Ingested reading" });
});

export default app;

const dataFromContext = async (c: Context): Promise<string> => {
  const data: Record<string, any> = {};

  data.pixel_id = c.req.param("id");
  data.event = c.req.query("ev");
  data.url = c.req.url;
  data.headers = c.req.header();
  data.referer = c.req.header("Referer");
  data.user_agent = c.req.header("User-Agent");

  return JSON.stringify(data);
};

const buildPixelCode = async (pixel: Pixel) => {
  const url = `${getBaseUrl()}/api/pixels/${pixel.id}/ingest`;
  const event = "visit";

  const code = pixelTemplate(pixel.id, event, url);

  return code;
};

const pixelTemplate = (id: string, event: string, url: string) => {
  const template = `<!-- Lumens Pixel Script  Start -->
				<script>
					!function(l,e,u,s,p){l.lspx||(p=l.lspx=function(){p.callMethod?p.callMethod.apply(p,arguments):p.queue.push(arguments)},l._lspx||(l._lspx=p),l.lspxurl=s,p.push=p,p.loaded=!0,p.version="2.0",p.queue=[],p.callMethod=function(e,...u){let s=l.lspxurl.includes("?")?"&":"?";"init"===e?l.lspxurl+=s+"id="+u[0]:"track"===e?l.lspxurl+=s+"ev="+u[0]:"title"===e?l.lspxurl+=s+"t="+u[0]:"source"===e?l.lspxurl+=s+"s="+u[0]:"reference"===e&&(l.lspxurl+=s+"r="+u[0])},setTimeout(function e(){for(;p.queue.length>0;){let u=p.queue.shift();p.callMethod.apply(p,u)}if(!l.pixelSent){if(!(l.lspxurl.includes("id")&&l.lspxurl.includes("ev")))return;new Image(0,0).src=l.lspxurl,l.pixelSent=!0}},0))}(window,document,"script","${url}");

					lspx("init", "${id}");
					lspx("track", "${event}");
				</script>
				<noscript>
					<img height="0" width="0" style="display:none;" src="${url}?id=${id}&ev=${event}"/>
				</noscript>
			<!-- Lumens Pixel Script End -->`;
  return template;
};
