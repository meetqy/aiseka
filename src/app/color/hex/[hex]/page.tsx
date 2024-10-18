import { api } from "~/trpc/server";
import { Background } from "./background";
import { Button, Card, Chip, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Color from "color";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ComPlementaryIcons from "./icons";

const getColor = async (hex: string) => {
  hex = "#" + hex;
  return await Promise.all([api.tcb.getColor({ hex }), api.tcb.getPaletteByColor({ hex })]);
};

export const generateMetadata = async ({ params }: { params: { hex: string } }): Promise<Metadata> => {
  const [color] = await getColor(params.hex);
  if (!color) notFound();
  const hex = color.hex.toUpperCase();

  return {
    title: `${hex} ${color.introduce?.name} ${color.introduce?.name_en} 颜色信息`,
    description: `${hex} 的 HSL、RGB、CMYK、HSV、XYZ 格式转换结果，以及颜色的互补色、三角色、四角色、相邻色等颜色组合，相关的调色盘/色卡。`,
    twitter: {
      card: "summary_large_image",
      site: "@aiseka",
    },
    openGraph: {
      type: "article",
      url: `https://color.aiseka.cn/color/hex/${hex.replace("#", "")}`,
    },
  };
};

export default async function Page({ params }: { params: { hex: string } }) {
  const [color, palettes] = await getColor(params.hex);
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
      <main className="flex w-full p-4 lg:gap-8 lg:p-0">
        <article className="prose max-w-screen-xl flex-1 rounded-medium bg-white p-4 lg:p-8">
          <h1 className="uppercase">
            <span className="font-mono">{color.hex}</span> - 颜色信息
          </h1>

          <div className="relative flex aspect-[4/2] w-full items-center justify-center rounded-medium lg:aspect-[12/3]" style={{ backgroundColor: color.hex }}>
            <div
              className="flex w-3/5 items-center justify-between rounded-medium px-4 py-2 font-mono text-xl font-medium uppercase shadow-md lg:w-1/4"
              style={{
                backgroundColor: isDark ? "white" : "black",
                color: color.hex,
              }}
            >
              <span>{color.hex}</span>
              <Button radius="full" isIconOnly style={{ backgroundColor: color.hex }} />
            </div>
            <Button
              radius="full"
              isIconOnly
              as={Link}
              href={`/color/hex/${color.random.replace("#", "")}`}
              className="absolute bottom-2 right-2 lg:bottom-8 lg:right-8"
              style={{
                backgroundColor: isDark ? "white" : "black",
                color: color.hex,
              }}
              aria-label="Random Color"
            >
              <Icon icon={"lets-icons:sort-random"} className="h-6 w-6" />
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
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

          <div>
            <h2>
              <span className="uppercase">{color.hex}</span> {color.introduce?.name_en} {color.introduce?.name}
            </h2>
            <p>{color.introduce?.description}</p>
            <div className="flex flex-wrap gap-2">
              {color.introduce?.meaning?.map((item) => (
                <Chip color="primary" key={item} style={{ backgroundColor: color.hex, color: isDark ? "white" : "black" }}>
                  {item}
                </Chip>
              ))}
              {color.introduce?.usage?.map((item) => (
                <Chip color="primary" key={item} style={{ backgroundColor: color.hex, color: isDark ? "white" : "black" }}>
                  {item}
                </Chip>
              ))}
            </div>
          </div>

          <h2>颜色组合</h2>
          {colors.map((item) => {
            return (
              <section key={item.title}>
                <h3 className="relative flex items-center">
                  {ComPlementaryIcons[item.title.replace(" ", "") as keyof typeof ComPlementaryIcons]({
                    className: "w-10 h-10",
                    color: color.hex,
                  })}
                  <span className="ml-4 flex flex-col">
                    <span>{item.title}</span>
                    <span className="font-normal text-foreground-500">{item.desc}</span>
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
                  {item.colors.map((color) => (
                    <Card
                      className="flex aspect-[2/1] items-center justify-center font-mono text-xl uppercase lg:aspect-[5/2]"
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

          <h2>调色盘推荐</h2>
          <div className="grid gap-4 lg:gap-8">
            {palettes.map((item) => (
              <div key={item.hex} className="flex overflow-hidden rounded-medium shadow-medium">
                {item.palette.map((color) => (
                  <div className="relative flex aspect-square flex-1 flex-col items-center justify-center md:aspect-[16/10] lg:aspect-video" key={color}>
                    <div style={{ backgroundColor: color, color: isDark ? "white" : "black" }} className="flex h-full w-full items-center justify-center text-2xl">
                      {color === item.hex ? "✓" : ""}
                    </div>
                    <p style={{ color: Color(color).isDark() ? "white" : "black" }} className="xs:tex-base absolute bottom-1 z-10 m-0 py-1 text-center font-mono text-sm lg:text-lg">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </article>

        <aside className="hidden h-screen w-72 shrink-0 rounded-medium xl:block">
          <section className="rounded-medium bg-background p-4">
            <p className="mb-4 text-center font-medium text-foreground-500">微信小程序：颜色搭配色卡</p>
            <Image src="/qrcode.png" alt="微信小程序：颜色搭配色卡" />
          </section>
        </aside>
      </main>
      <Background color={color.hex} />
    </>
  );
}
