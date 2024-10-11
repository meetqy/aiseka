"use client";

import { api } from "~/trpc/react";
import { ColorCard } from "./color-card";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import { type ColorType } from "~/server/api/routers/tcb";

export const ColorInfinite = (params: { type?: ColorType; limit?: number }) => {
  const { data, fetchNextPage, refetch } = api.tcb.getColors.useInfiniteQuery(
    { limit: params.limit, nextCursor: 2, type: params.type },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    },
  );

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    initialIsIntersecting: false,
  });

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage, isIntersecting]);

  useEffect(() => {
    refetch();
  }, [params.type, refetch]);

  return (
    <>
      <section className="grid h-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.pages.map((page) => {
          return page.data.map((color) => {
            return <ColorCard key={color._id} hex={color.hex} />;
          });
        })}
      </section>

      <p
        ref={ref}
        className="-mt-80 flex h-96 items-end justify-center text-center text-content4-foreground"
      >
        load more ...
      </p>
    </>
  );
};
