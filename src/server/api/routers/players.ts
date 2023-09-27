import { z } from "zod";
import { createTRPCRouter, publicProcedure } from ":)/server/api/trpc";

export const playersRouter = createTRPCRouter({
  //   createPlayer: publicProcedure
  //     .input(
  //       z.object({
  //         name: z.string(),
  //         position: z.string(),
  //         team: z.string(),
  //         number: z.string(),
  //         height: z.string(),
  //         weight: z.string(),
  //         age: z.string(),
  //         experience: z.string(),
  //         college: z.string(),
  //         birthdate: z.string(),
  //       })
  //     )
  //     .query(async ({ input }) => {
  //       try {
  //         // const player = await createPlayer(input);
  //         // return player;
  //         return;
  //       } catch (error) {
  //         console.error(error);
  //         throw error;
  //       }
  //     }),
});
