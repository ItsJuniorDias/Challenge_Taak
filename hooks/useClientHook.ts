import "react-native-get-random-values";
import { api } from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import database from "../database";
import Client from "@/model/Client";
import { Model } from "@nozbe/watermelondb";

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

  console.log(clients, "CLIENTS");

  const loadClientsWatermelon = async () => {
    const clientsCollection = await database.collections.get<Client>("clients");

    const allClients = await clientsCollection.query().fetch();

    setClients(allClients);
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

  const deleteClientWatermelon = async (id: string) => {
    try {
      const client = await database.get("clients").find(id);

      await database.write(async () => {
        await client.destroyPermanently();
      });

      loadClientsWatermelon();
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  const postClientAPI = async () => {
    try {
      clients.forEach(async (item) => {
        const response = await api.post("/clients", {
          id: item._raw.id,
          name: item.name,
          cnpj: item.cnpj,
          contact: item.contact,
        });

        console.log(response.data, "RESPONSE DATA");
      });
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  useEffect(() => {
    postClientAPI();
  }, []);

  return {
    clients,
    addClientWatermelon,
    editClientWatermelon,
    deleteClientWatermelon,
  };
}
