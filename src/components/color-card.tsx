"use client";

import { Card, CardBody } from "@nextui-org/react";
import Color from "color";

interface Props {
  hex: string;
}

export const ColorCard = ({ hex }: Props) => {
  const dark = Color(hex).isDark();

  return (
    <Card
      className="aspect-[2/3] cursor-pointer hover:scale-105 transform transition-transform"
      shadow="md"
      style={{ background: hex, color: dark ? "white" : "black" }}
    >
      <CardBody className="p-6">
        <h3 className="uppercase text-2xl font-mono font-medium">{hex}</h3>
      </CardBody>
    </Card>
  );
};
