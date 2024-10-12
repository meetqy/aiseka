import { api } from "~/trpc/server";
import { Background } from "./background";
import { Button, Card, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Color from "color";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

const getColor = (hex: string) => {
  return api.tcb.getColor({ hex: "#" + hex });
};

export const generateMetadata = async ({ params }: { params: { hex: string } }): Promise<Metadata> => {
  const color = await getColor(params.hex);
  if (!color) notFound();
  const hex = color.hex.toUpperCase();

  return {
    title: `${hex} 颜色信息`,
    description: `${hex} 的 HSL、RGB、CMYK、HSV、XYZ 格式转换结果，以及颜色的互补色、三角色、四角色、相邻色等颜色组合，相关的调色盘/色卡。`,
  };
};

export default async function Page({ params }: { params: { hex: string } }) {
  const color = await getColor(params.hex);
  if (!color) notFound();

  const colorObj = Color(color.hex);
  const colorArr = [
    { value: colorObj.hex(), name: "HEX" },
    { value: colorObj.rgb().round().array(), name: "RGB" },
    { value: colorObj.hsl().round().array(), name: "HSL" },
    { value: colorObj.cmyk().round().array(), name: "CMYK" },
    { value: colorObj.hsv().round().array(), name: "HSV" },
    { value: colorObj.xyz().round().array(), name: "XYZ" },
    { value: colorObj.hex(), name: "Web Safe" },
  ];

  const isDark = colorObj.isDark();

  // 互补的颜色，彼此相反。两个相反的颜色。
  const complementary = [color.hex, colorObj.rotate(180).hex()];
  // 主色和另外两种颜色躺在对面主色的边缘。
  const splitComplementary = [color.hex, colorObj.rotate(150).hex(), colorObj.rotate(210).hex()];
  // 色轮上三个等距的颜色的组合。
  const triadic = [color.hex, colorObj.rotate(120).hex(), colorObj.rotate(240).hex()];
  // 两对互补色的组合，当形成一个正方形或长方形。
  const tetradic = [color.hex, colorObj.rotate(60).hex(), colorObj.rotate(180).hex(), colorObj.rotate(240).hex()];
  // 相反的颜色和它在色轮上的邻居的组合。
  const analogusComplementary = [color.hex, colorObj.rotate(30).hex(), colorObj.rotate(180).hex(), colorObj.rotate(210).hex()];
  // 色轮中四个相邻颜色的组合。
  const analogus = [color.hex, colorObj.rotate(30).hex(), colorObj.rotate(60).hex(), colorObj.rotate(90).hex()];
  const format = (hex: string) => {
    return {
      hex,
      isDark: Color(hex).isDark(),
    };
  };

  const slugify = (str: string) => str.toLowerCase().replace(/\s/g, "-");
  const colors = [
    { title: "Complementary", src: slugify("Complementary"), desc: "互补的颜色，彼此相反，两个相反的颜色。", colors: complementary.map((e) => format(e)) },
    { title: "Split Complementary", src: slugify("Split Complementary"), desc: "主色和另外两种颜色躺在对面主色的边缘。", colors: splitComplementary.map((e) => format(e)) },
    { title: "Triadic", src: slugify("Triadic"), desc: "色轮上三个等距的颜色的组合。", colors: triadic.map((e) => format(e)) },
    { title: "Tetradic", src: slugify("Tetradic"), desc: "两对互补色的组合，当形成一个正方形或长方形。", colors: tetradic.map((e) => format(e)) },
    { title: "Analogus Complementary", src: slugify("Analogus Complementary"), desc: "相反的颜色和它在色轮上的邻居的组合。", colors: analogusComplementary.map((e) => format(e)) },
    { title: "Analogus", src: slugify("Analogus"), desc: "色轮中四个相邻颜色的组合。", colors: analogus.map((e) => format(e)) },
  ];

  return (
    <>
      <main className="flex w-full gap-8">
        <article className="prose max-w-screen-xl flex-1 rounded-medium bg-white p-8">
          <h1 className="uppercase">
            <span className="font-mono">{color.hex}</span> - 颜色信息
          </h1>

          <div className="relative flex h-80 w-full items-center justify-center rounded-medium" style={{ backgroundColor: color.hex }}>
            <div className="flex h-14 w-full max-w-72 items-center justify-between rounded-medium bg-white px-4 font-mono text-xl font-medium uppercase shadow-md">
              <span>{color.hex}</span>
              <Button radius="full" isIconOnly style={{ backgroundColor: color.hex }} />
            </div>
            <Button
              radius="full"
              isIconOnly
              size="lg"
              className="absolute bottom-8 right-8"
              style={{
                backgroundColor: isDark ? "white" : "black",
                color: color.hex,
              }}
              variant="flat"
            >
              <Icon icon={"lets-icons:sort-random"} className="h-6 w-6" />
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {colorArr.map((item) => (
              <div key={item.name} className="flex flex-col">
                <span className="text-sm font-medium text-foreground-400">{item.name}</span>
                <b className="font-mono text-lg uppercase">{typeof item.value === "string" ? item.value : item.value.join(", ")}</b>
              </div>
            ))}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground-400">Luminosity</span>
              <b className="font-mono text-lg uppercase">{colorObj.luminosity().toFixed(2)}</b>
            </div>
          </div>

          <h2>颜色组合</h2>
          {colors.map((item) => {
            return (
              <section key={item.title}>
                <h3 className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="font-normal text-foreground-500">{item.desc}</span>
                </h3>
                <p></p>
                <div className="grid grid-cols-4 gap-8">
                  {item.colors.map((color) => (
                    <Card
                      className="flex aspect-[5/2] items-center justify-center font-mono text-xl uppercase"
                      key={color.hex}
                      style={{
                        backgroundColor: color.hex,
                        color: color.isDark ? "white" : "black",
                      }}
                    >
                      {color.hex}
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </article>

        <aside className="h-screen w-72 shrink-0 rounded-medium">
          <section className="rounded-medium bg-background p-4">
            <p className="mb-4 text-center">微信小程序：颜色搭配色卡</p>
            <Image src="/qrcode.png" alt="微信小程序：颜色搭配色卡" />
          </section>
        </aside>
      </main>
      <Background color={color.hex} />
    </>
  );
}
