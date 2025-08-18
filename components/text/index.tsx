import React from "react";
import { TextProps } from "react-native";
import { Text } from "./styles";

export interface TextComponentProps extends TextProps {
  title: string;
  fontFamily: "regular" | "semi-bold" | "bold";
  fontSize: 12 | 14 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96;
  color: string;
}

export default function TextComponent({
  title,
  fontFamily,
  color,
  fontSize,
  ...props
}: TextComponentProps) {
  const objectLiteralsFontFamily = {
    regular: "Roboto-Regular",
    "semi-bold": "Roboto-SemiBold",
    bold: "Roboto-Bold",
  };

  return (
    <Text
      {...props}
      title={title}
      fontFamily={objectLiteralsFontFamily[fontFamily]}
      fontSize={fontSize}
      color={color}
    >
      {title}
    </Text>
  );
}
