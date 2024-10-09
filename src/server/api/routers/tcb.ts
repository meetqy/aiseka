import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import tcb from "@cloudbase/node-sdk";
import { z } from "zod";

const app = tcb.init({
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
  env: process.env.TCB_ENV_ID,
});

export const tcbRouter = createTRPCRouter({
  getColors: publicProcedure
    .input(
      z.object({
        limit: z.number().default(25),
        cursor: z.number().default(1),
        nextCursor: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const cursor = input.nextCursor ?? input.cursor;
      const res = await app.callFunction({
        name: "get-colors",
        data: {
          limit: input.limit,
          page: cursor,
        },
      });

      const result = res.result as {
        data: Color[];
        total: number;
        pages: number;
        hasNext: boolean;
      };

      let nextCursor: number | undefined = undefined;
      if (result.hasNext) {
        nextCursor = cursor + 1;
      }

      return {
        data: result.data,
        hasNextPage: result.hasNext,
        nextCursor,
      };
    }),
});
