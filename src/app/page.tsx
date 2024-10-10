import { ColorCard } from "~/components/color-card";
import { ColorInfinite } from "~/components/color-infinite";
import { ColorTab } from "~/components/color-tab";
import { type ColorType } from "~/server/api/routers/tcb";
import { api, HydrateClient } from "~/trpc/server";

export default async function ColorsPage({
  params,
}: {
  params: { name: ColorType };
}) {
  const limit = 30;
  const res = await api.tcb.getColors({
    limit,
    cursor: 1,
    type: params.name,
  });

  return (
    <HydrateClient>
      <div className="space-y-4 px-4">
        <header className="px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              颜色精选
            </h2>
            <p className="mt-6 text-lg leading-8 text-content3-foreground">
              RGB、HEX、CMYK、HSL代码，组合和颜色渐变，点击颜色可以查看更多详细信息。
            </p>
          </div>
        </header>

        <ColorTab name={params.name} />

        <div className="grid gap-8">
          <section className="grid h-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {res.data.map((color) => {
              return <ColorCard key={color._id} hex={color.hex} />;
            })}
          </section>
          <ColorInfinite limit={30} type={params.name} />
        </div>
      </div>
    </HydrateClient>
  );
}
