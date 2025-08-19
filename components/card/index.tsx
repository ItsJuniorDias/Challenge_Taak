import React from "react";

import { Text } from "../";

import { Container, Row } from "./styles";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

interface CardComponent {
  id: number;
  title: string;
  cnpj: string;
  contact: string;
  onPress: () => void;
}

export default function CardComponent({
  id,
  title,
  cnpj,
  contact,
  onPress,
}: CardComponent) {
  return (
    <Container key={id} onPress={onPress}>
      <Text
        title={title}
        color={Colors.light.grayText}
        fontFamily="semi-bold"
        fontSize={16}
        style={{ marginBottom: 8 }}
      />

      <Row>
        <View>
          <Text
            title={"CNPJ"}
            color={Colors.light.tabIconDefault}
            fontFamily="semi-bold"
            fontSize={12}
          />

          <Text
            title={cnpj}
            color={Colors.light.tabIconDefault}
            fontFamily="semi-bold"
            fontSize={12}
          />
        </View>

        <View>
          <Text
            title={"Contato"}
            color={Colors.light.tabIconDefault}
            fontFamily="semi-bold"
            fontSize={12}
          />

          <Text
            title={contact}
            color={Colors.light.tabIconDefault}
            fontFamily="semi-bold"
            fontSize={12}
          />
        </View>
      </Row>
    </Container>
  );
}
