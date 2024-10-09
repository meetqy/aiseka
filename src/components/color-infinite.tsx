"use client";

import { api } from "~/trpc/react";
import { ColorCard } from "./color-card";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";

export const ColorInfinite = () => {
  const { data, fetchNextPage } = api.tcb.getColors.useInfiniteQuery(
    { limit: 25, nextCursor: 2 },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    },
  );

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  });

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage, isIntersecting]);

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
        className="flex h-16 items-center justify-center text-center text-content4-foreground"
      >
        load more ...
      </p>
    </>
  );
};
