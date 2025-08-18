import React from "react";
import { Text } from "@/components";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        title="Screen Home"
        fontFamily="semi-bold"
        fontSize={16}
        color={Colors.light.text}
      />
    </View>
  );
}
