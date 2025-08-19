import React, { useState } from "react";
import { Text, Header, Card, FloatButton, Input } from "@/components";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const [isActiveForm, setIsActiveForm] = useState(false);

  const [value, setValue] = useState("");

  const router = useRouter();

  return (
    <>
      <Header title="Clientes" description="Contas cadastradas" />

      <ScrollView contentContainerStyle={styles.container}>
        {!isActiveForm && (
          <Card
            title="GRUPO Taak"
            cnpj="11.222.333/0001-44"
            contact="Matheus coelho campos"
          />
        )}

        {isActiveForm && (
          <>
            <Input
              value={value}
              placeholder="Nome da empresa"
              onChangeText={setValue}
            />

            <Input value={value} placeholder="CNPJ" onChangeText={setValue} />

            <Input
              value={value}
              placeholder="Contato"
              onChangeText={setValue}
            />
          </>
        )}

        <FloatButton onPress={() => setIsActiveForm(true)} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 24,
  },
});
