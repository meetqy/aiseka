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
        page: z.number().default(1),
      }),
    )
    .query(async ({ input }) => {
      const res = await app.callFunction({
        name: "get-colors",
        data: {
          limit: input.limit,
          page: input.page,
        },
      });

      return res.result as {
        data: Color[];
        total: number;
        pages: number;
        hasNext: boolean;
      };
    }),
});
