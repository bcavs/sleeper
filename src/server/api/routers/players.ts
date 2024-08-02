import { z } from "zod";
import { createTRPCRouter, publicProcedure } from ":)/server/api/trpc";

export const playersRouter = createTRPCRouter({
  getPlayerById: publicProcedure
    .input(
      z.object({
        player_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const player = await ctx.prisma.player.findUnique({
          where: {
            player_id: input.player_id,
          },
        });

        return player;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),

  getRosterPlayers: publicProcedure
    .input(
      z.object({
        player_ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const players = await ctx.prisma.player.findMany({
          where: {
            player_id: {
              in: input.player_ids,
            },
          },
        });

        return players;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
