import { sleeperRouter } from ":)/server/api/routers/sleeper";
import { playersRouter } from ":)/server/api/routers/players";
import { createTRPCRouter } from ":)/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sleeper: sleeperRouter,
  players: playersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
