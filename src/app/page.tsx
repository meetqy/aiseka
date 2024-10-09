import { ColorCard } from "~/components/color-card";
import { HydrateClient } from "~/trpc/server";

const colors = [
  "#206a44",
  "#504d41",
  "#1fd11f",
  "#2d3637",
  "#42393d",
  "#041d17",
  "#91665b",
  "#4d4c46",
  "#574b52",
  "#b65b3b",
  "#220a0b",
  "#640c14",
  "#9f5958",
  "#495253",
  "#6a6163",
  "#901c13",
  "#dba136",
  "#12100c",
  "#1a8bed",
  "#050605",
];

export default async function Home() {
  return (
    <HydrateClient>
      <div className="px-4">
        <header className="px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              纯色列表
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              RGB、HEX、CMYK、HSL代码，组合和颜色渐变，点击颜色可以查看更多详细信息。
            </p>
          </div>
        </header>
        <section className="grid h-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {colors.map((color, index) => {
            return <ColorCard key={index} hex={color} />;
          })}
        </section>
      </div>
    </HydrateClient>
  );
}
