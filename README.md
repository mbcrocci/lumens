# Lumens

This is a research project to explore the potential of using AI to analyze web traffic and user behavior.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

- `/src/app`: The main application code.
  - `/src/app/api/[[...hono]]`: The base API route serving a [Hono](https://honojs.dev/) application.
- `/src/components`: Reusable client components.
  - `/src/components/ui`: UI components from the [Shadcn UI](https://ui.shadcn.com/) library.
- `/src/server`: The server-side code.
  - `/src/server/db`: The database schema and queries.
  - `/src/server/routes`: The API routes.
- `/src/utils`: Utility functions.

## Features

- Real-time analytics
- Simple integration
- Detailed metrics
- Lightning fast

## Contributing

Contributions are welcome!
