import React from "react";

import { Text } from "../";

import { Container, Row } from "./styles";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export interface CardComponentProps {
  testID?: string;
  id: number;
  title: string;
  cnpj: string;
  contact: string;
  onPress: () => void;
}

export default function CardComponent({
  testID = "card_component_testID",
  id,
  title,
  cnpj,
  contact,
  onPress,
}: CardComponentProps) {
  return (
    <Container testID={testID} key={id} onPress={onPress}>
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
