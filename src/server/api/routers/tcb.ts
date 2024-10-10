import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import tcb from "@cloudbase/node-sdk";
import { z } from "zod";

const app = tcb.init({
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
  env: process.env.TCB_ENV_ID,
});

const db = app.database();

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
      const dbColors = db.collection("colors");

      const [colors, count] = await Promise.all([
        dbColors
          .limit(input.limit)
          .skip((input.cursor - 1) * input.limit)
          .get(),
        dbColors.count(),
      ]);

      const total = count.total ?? 0;
      const hasNextPage = total > input.cursor * input.limit;
      const result = {
        data: colors.data,
        total,
        pageCount: Math.ceil(total / input.limit),
        hasNextPage,
        nextCursor: hasNextPage ? input.cursor + 1 : undefined,
      };

      return result;
    }),
});
