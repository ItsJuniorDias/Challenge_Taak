import React, { useEffect, useState } from "react";
import { Header, Card, FloatButton, Input, Button } from "@/components";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, StyleSheet, ScrollView, FlatList, Alert } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { uuidv4, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClientHook } from "@/hooks";
import { useRouter } from "expo-router";

const schema = z.object({
  id: uuidv4().optional(),
  name: z.string().min(1, "* Nome da empresa é obrigatório"),
  cnpj: z.string().min(1, "* CNPJ é obrigatório"),
  contact: z.string().min(1, "* Contato é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function ClientScreen() {
  const {
    query,
    mutationCreate,
    mutationDelete,
    mutationEdit,
    addClientWatermelon,
    deleteClientWatermelon,
    editClientWatermelon,
    clients,
  } = useClientHook();

  const router = useRouter();

  // console.log(query.data, "DATA");

  const [isActiveForm, setIsActiveForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      cnpj: "",
      contact: "",
    },
  });

  const onSubmit = async (data) => {
    const id = await AsyncStorage.getItem("@id");

    console.log(id, "ID");

    console.log(isEdit, "IS EDIT");

    if (isEdit) {
      editClientWatermelon({
        id: id,
        name: data.name,
        cnpj: data.cnpj,
        contact: data.contact,
      });
    } else {
      addClientWatermelon({
        name: data.name,
        cnpj: data.cnpj,
        contact: data.contact,
      });
    }

    setIsActiveForm(false);

    resetField("name");
    resetField("cnpj");
    resetField("contact");
  };

  const handleDeleteOrEdit = ({ id, name, cnpj, contact }) => {
    Alert.alert(
      "Deseja deletar ou editar",
      "Escolha se você quer editar ou deletar",
      [
        {
          text: "Editar",
          onPress: async () => {
            setIsEdit(true);
            setIsActiveForm(true);

            console.log(id, "ID");

            await AsyncStorage.setItem("@id", id);

            setValue("id", id);
            setValue("name", name);
            setValue("cnpj", cnpj);
            setValue("contact", contact);
          },
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => deleteClientWatermelon(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <Header title="Clientes" description="Contas cadastradas" />

      <ScrollView contentContainerStyle={styles.container}>
        {!isActiveForm && (
          <FlatList
            data={clients}
            renderItem={({ item }) => (
              <Card
                id={item?._raw?.id}
                title={item.name}
                cnpj={item.cnpj}
                contact={item.contact}
                onPress={() =>
                  handleDeleteOrEdit({
                    id: item._raw.id,
                    name: item.name,
                    cnpj: item.cnpj,
                    contact: item.contact,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
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
                testID="button_safe_testID"
                isLoading={query.isLoading}
                title="Salvar"
                backgroundColor={Colors.light.tint}
                colorText={Colors.light.background}
                onPress={handleSubmit(onSubmit)}
                style={{ width: "45%" }}
              />
            </View>
          </>
        )}
      </ScrollView>

      <FloatButton
        onPress={() => {
          setIsEdit(false);
          setIsActiveForm(true);

          resetField("name");
          resetField("cnpj");
          resetField("contact");
        }}
      />
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
