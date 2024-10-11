import { ButtonGroup, Button } from "@nextui-org/react";
import Link from "next/link";

export const TABS = {
  new: "🆕 最新",
  random: "🐔 随机",
  popular: "🔥 受欢迎",
};

export const ColorTab = (props: { name?: string }) => {
  return (
    <ButtonGroup radius="sm" className="rounded-medium shadow-medium">
      {Object.entries(TABS).map(([key, value]) => (
        <Button
          key={key}
          color={props.name === key ? "primary" : "default"}
          variant={props.name === key ? "shadow" : "light"}
          as={Link}
          href={`/color/tag/${key}`}
        >
          {value}
        </Button>
      ))}
    </ButtonGroup>
  );
};

ColorTab.defaultProps = {
  name: "new",
};
