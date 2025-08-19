import React from "react";
import { Header, Text } from "@/components";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Header title="Clientes" description="Nenhuma conta cadastrada" />
    </View>
  );
}
