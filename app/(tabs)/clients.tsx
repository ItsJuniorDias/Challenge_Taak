import React, { useState } from "react";
import { Header, Card, FloatButton, Input, Button } from "@/components";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet, ScrollView } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "* Nome da empresa é obrigatório"),
  cnpj: z.string().min(1, "* CNPJ é obrigatório"),
  contact: z.string().min(1, "* Contato é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function ExploreScreen() {
  const [isActiveForm, setIsActiveForm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      cnpj: "",
      contact: "",
    },
  });

  console.log(errors, "ERROR");

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

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
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  placeholder="Nome da empresa"
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              name="cnpj"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  placeholder="CNPJ "
                  onChangeText={onChange}
                  error={errors.cnpj?.message}
                />
              )}
            />

            <Controller
              name="contact"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  placeholder="Contato"
                  onChangeText={onChange}
                  error={errors.contact?.message}
                />
              )}
            />

            <View style={styles.contentButton}>
              <Button
                title="Voltar"
                backgroundColor="#919191"
                colorText={Colors.light.background}
                onPress={() => setIsActiveForm(false)}
                style={{ width: "45%" }}
              />

              <Button
                title="Salvar"
                backgroundColor={Colors.light.tint}
                colorText={Colors.light.background}
                onPress={handleSubmit(onSubmit)}
                style={{ width: "45%" }}
              />
            </View>
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
  contentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
});
