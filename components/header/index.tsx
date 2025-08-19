import React from "react";

import { Text } from "../";

import { Container } from "./styles";
import { Colors } from "@/constants/Colors";

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <Container>
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
