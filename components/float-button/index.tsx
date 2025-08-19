import React from "react";
import { StyleSheet } from "react-native";
import { Container } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface FloatButtonComponentProps {
  onPress: () => void;
}

export default function FloatButtonComponent({
  onPress,
}: FloatButtonComponentProps) {
  return (
    <Container onPress={onPress} style={styles.container}>
      <Feather name="plus" size={32} color={Colors.light.tint} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
