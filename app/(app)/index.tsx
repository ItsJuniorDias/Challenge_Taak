import React from "react";
import { Button, Text } from "@/components";
import { Container } from "./styles";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Container>
      <Text
        title="Onboarding Screen"
        color={Colors.light.text}
        fontSize={16}
        fontFamily="semi-bold"
      />

      <Button
        testID="button_testID"
        title="Go to HomeScreen"
        backgroundColor={Colors.light.tint}
        colorText={Colors.light.background}
        onPress={() => router.push("/(tabs)")}
      />
    </Container>
  );
}
