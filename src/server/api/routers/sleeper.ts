import { z } from "zod";
import { createTRPCRouter, publicProcedure } from ":)/server/api/trpc";
import {
  fetchRosters,
  fetchLeague,
  fetchLeagueUsers,
  fetchUser,
} from ":)/utils/helpers";

export const sleeperRouter = createTRPCRouter({
  getLeague: publicProcedure
    .input(
      z.object({
        leagueId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const league = await fetchLeague(input.leagueId);
        return league;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
  getLeagueUsers: publicProcedure
    .input(
      z.object({
        leagueId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const leagueUsers = await fetchLeagueUsers(input.leagueId);
        return leagueUsers;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),

  getRosters: publicProcedure
    .input(
      z.object({
        leagueId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const rosters = await fetchRosters(input.leagueId);

        return rosters;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
  getUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const user = await fetchUser(input.userId);

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
