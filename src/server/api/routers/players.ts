import { z } from "zod";
import { createTRPCRouter, publicProcedure } from ":)/server/api/trpc";
import { fetchPlayerFantasyStats } from ":)/utils/helpers";

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

  getPlayerFantasyStatsById: publicProcedure
    .input(
      z.object({
        espn_id: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        const playerFantasyStats = await fetchPlayerFantasyStats({
          playerEspnId: input.espn_id,
        });
        return playerFantasyStats;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),

  syncPlayerFantasyStatsById: publicProcedure
    .input(
      z.object({
        espn_id: z.number(),
        player_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const playerFantasyStats = await fetchPlayerFantasyStats({
          playerEspnId: input.espn_id,
        });

        if (!playerFantasyStats) {
          throw new Error("Failed to fetch player fantasy stats");
        }

        if (playerFantasyStats.statusCode !== 200) {
          throw new Error("Failed to fetch player fantasy stats");
        }

        const gamesData = Object.entries(playerFantasyStats.body);

        if (!gamesData) {
          throw new Error("Failed to fetch player fantasy stats");
        }

        const structuredGameData = gamesData.map(([gameId, _]) => {
          // expected gameId format: "20241012_CHI@GB"
          const game_date = gameId.split("_")[0] ?? "";
          const teams = gameId.split("_")[1];
          const away_team_abbr = teams?.split("@")[0] ?? "";
          const home_team_abbr = teams?.split("@")[1] ?? "";

          return {
            game_id: gameId,
            game_date,
            away_team_abbr,
            home_team_abbr,
          };
        });

        const structuredPlayerStatlineData = gamesData.map(
          ([gameId, stats]) => {
            // TODO: Pull out all the stats we want to store in the database from the stats JSON
            return {
              id: `${input.player_id}_${gameId}`,
              player_id: input.player_id,
              fantasy_pts: parseFloat(stats.fantasyPoints),
              stats: JSON.stringify(stats),
            };
          }
        );

        await Promise.all(
          structuredGameData.map((game, index) => {
            if (!structuredPlayerStatlineData[index]) return;

            console.log("Upserting game:", game.game_id, game);

            return ctx.prisma.game.upsert({
              where: {
                game_id: game.game_id,
              },
              create: {
                game_id: game.game_id,
                game_date: game.game_date,
                away_team_abbr: game.away_team_abbr,
                home_team_abbr: game.home_team_abbr,
                PlayerStatline: {
                  connectOrCreate: {
                    where: {
                      id: structuredPlayerStatlineData[index].id ?? "",
                    },
                    create: structuredPlayerStatlineData[index],
                  },
                },
              },
              update: {
                PlayerStatline: {
                  connectOrCreate: {
                    where: {
                      id: structuredPlayerStatlineData[index].id,
                    },
                    create: structuredPlayerStatlineData[index],
                  },
                },
              },
            });
          })
        );

        await ctx.prisma.player.update({
          where: {
            espn_id: input.espn_id,
          },
          data: {
            fantasy_stats: JSON.stringify(playerFantasyStats.body),
            updated_at: new Date(),
          },
        });

        return playerFantasyStats;
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
          include: {
            PlayerStatline: true,
          },
        });

        return players;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
