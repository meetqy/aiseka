"use client";
import { useEffect } from "react";

export const Background = ({ color }: { color: string }) => {
  useEffect(() => {
    document.body.style.backgroundColor = color;

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [color]);

  return null;
};
