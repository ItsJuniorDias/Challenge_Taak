import React from "react";
import { Text } from "@/components";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        title="Screen Explore"
        fontFamily="semi-bold"
        fontSize={16}
        color={Colors.light.text}
      />
    </View>
  );
}
