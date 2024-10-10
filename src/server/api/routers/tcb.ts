import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import tcb from "@cloudbase/node-sdk";
import { z } from "zod";

const app = tcb.init({
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
  env: process.env.TCB_ENV_ID,
});

export const TYPE = [
  "new",
  "random",
  "popular",
  "red",
  "green",
  "blue",
] as const;
export type ColorType = (typeof TYPE)[number];

export const tcbRouter = createTRPCRouter({
  getColors: publicProcedure
    .input(
      z.object({
        limit: z.number().default(30),
        type: z.enum(TYPE).default("new"),
        cursor: z.number().default(1),
        nextCursor: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { type } = input;

      const db = app.database();
      let query = db.collection("colors");

      if (type === "random") {
        if (input.limit % 2 !== 0) {
          input.limit += 1;
        }
        const limit = input.limit;

        const res = await Promise.all([
          query
            .aggregate()
            .sample({ size: limit / 2 })
            .end(),
          query
            .aggregate()
            .sample({ size: limit / 2 })
            .end(),
        ]);

        const [a, b] = res as { data: Color[] }[];

        return {
          data: a && b ? a.data.concat(b.data) : [],
          total: 9999,
          pageCount: 9999,
          hasNextPage: true,
          nextCursor: input.cursor + 1,
        };
      }

      if (type === "new") {
        query = query.where({}).orderBy("_id", "desc") as typeof query;
      } else if (type === "popular") {
        query = query.where({}).orderBy("views", "desc") as typeof query;
      }

      const [colors, count] = await Promise.all([
        query
          .skip((input.cursor - 1) * input.limit)
          .limit(input.limit)
          .get(),
        query.count(),
      ]);

      const total = count.total ?? 0;
      const hasNextPage = total > input.cursor * input.limit;
      const result = {
        data: colors.data as Color[],
        total,
        pageCount: Math.ceil(total / input.limit),
        hasNextPage,
        nextCursor: hasNextPage ? input.cursor + 1 : undefined,
      };

      return result;
    }),
});
