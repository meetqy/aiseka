"use client";

import { Card, CardBody } from "@nextui-org/react";
import Color from "color";
import Link from "next/link";

interface Props {
  hex: string;
}

export const ColorCard = ({ hex }: Props) => {
  const dark = Color(hex).isDark();

  return (
    <Card
      className="aspect-[2/3] transform cursor-pointer transition-transform hover:scale-105"
      shadow="md"
      style={{ background: hex, color: dark ? "white" : "black" }}
      as={Link}
      href={`/color/hex/${hex.replace("#", "").toLowerCase()}`}
    >
      <CardBody className="p-6">
        <h3 className="font-mono text-2xl font-medium uppercase">{hex}</h3>
      </CardBody>
    </Card>
  );
};
