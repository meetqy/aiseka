import Color from "color";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image({ params }: { params: { hex: string } }) {
  const hex = `#${params.hex}`.toUpperCase();
  const color = Color(hex).isDark() ? "white" : "black";

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 156,
          background: hex,
          color: color,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontWeight: 700,
        }}
      >
        {hex}
        <div
          style={{
            background: color,
            color: hex,
            position: "absolute",
            bottom: 0,
            right: 0,
            fontSize: 64,
            padding: "24px 64px",
            borderRadius: "32px 32px 0 0",
          }}
        >
          Read This Color
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
