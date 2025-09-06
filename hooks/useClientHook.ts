import "react-native-get-random-values";
import { api } from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import database from "../database";
import Client from "@/model/Client";
import { Model } from "@nozbe/watermelondb";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface ClientProps {
  id?: string;
  name: string;
  cnpj: string;
  contact: string;
}

export type DataProps = ClientProps[];

export default function useClientHook() {
  const queryClient = useQueryClient();

  const [clients, setClients] = useState<ClientProps[]>([]);

  const loadClientsWatermelon = async () => {
    const clientsCollection = await database.collections.get<Client>("clients");

    const allClients = await clientsCollection.query().fetch();

    const formatClient = allClients.map((item) => ({
      idWatermelon: item._raw.id,
      name: item.name,
      contact: item.contact,
      cnpj: item.cnpj,
    }));

    setClients(formatClient);
  };

  useEffect(() => {
    loadClientsWatermelon();
  }, []);

  const editClientWatermelon = async ({ id, name, cnpj, contact }) => {
    await database.write(async () => {
      const client = await database.get<Client>("clients").find(id);

      await client.update((clients) => {
        clients.name = name;
        clients.cnpj = cnpj;
        clients.contact = contact;
      });
    });
  };

  const addClientWatermelon = async ({ name, cnpj, contact }: ClientProps) => {
    try {
      await database.write(async () => {
        await database.collections.get<Client>("clients").create((clients) => {
          clients.name = name;
          clients.cnpj = cnpj;
          clients.contact = contact;
        });
      });

      loadClientsWatermelon();
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const deleteClientWatermelon = async (
    IDWatermelon: string,
    IDMongo: string
  ) => {
    try {
      const client = await database.get("clients").find(IDWatermelon);

      await database.write(async () => {
        await client.destroyPermanently();

        api.delete(`/api/clients/${IDMongo}`, {
          method: "DELETE",
        });
      });

      loadClientsWatermelon();
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const postClientAPI = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/clients",
        clients
      );

      Alert.alert("Success", "the list was updated successfully");

      console.log(response.data, "RESPONSE");
    } catch (error) {
      Alert.alert("Erro", "The list is already updated");
      console.error("Erro ao postar clientes:", error);
    }
  };

  const fetchClientsMongo = useCallback(async () => {
    const response = await axios.get("http://localhost:3000/api/clients");

    setClients((prevClients) => {
      const result = prevClients?.map((watermelon) => {
        const match = response?.data?.find(
          (mongo) => mongo?.name === watermelon?.name
        );

        return {
          idWatermelon: watermelon?.idWatermelon,
          idMongo: match ? match?._id : null,
          name: watermelon?.name,
          contact: watermelon?.contact,
          cnpj: watermelon?.cnpj,
          __v: match ? match?.__v : null,
        };
      });

      return result;
    });
  }, []);

  useEffect(() => {
    fetchClientsMongo();
  }, [fetchClientsMongo]);

  return {
    clients,
    addClientWatermelon,
    editClientWatermelon,
    deleteClientWatermelon,
    postClientAPI,
  };
}
