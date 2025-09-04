import React from "react";

import { Text } from "../";

import { Container } from "./styles";
import { Colors } from "@/constants/Colors";

export interface HeaderProps {
  testID?: string;
  title: string;
  description: string;
}

export default function Header({
  testID = "header_testID",
  title,
  description,
}: HeaderProps) {
  return (
    <Container testID={testID}>
      <Text
        title={title}
        color={Colors.light.background}
        fontFamily="semi-bold"
        fontSize={20}
      />

      <Text
        title={description}
        color={Colors.light.background}
        fontFamily="regular"
        fontSize={14}
      />
    </Container>
  );
}
