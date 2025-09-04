import "react-native-get-random-values";
import { api } from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import database from "../database";
import Client from "@/model/Clients";

export type DataProps = {
  id: number;
  name: string;
  cnpj: string;
  contact: string;
}[];

export default function useClientHook() {
  const queryClient = useQueryClient();

  const [clients, setClients] = useState([
    {
      name: "",
      cnpj: "",
      contact: "",
    },
  ]);

  const loadClientsWatermelon = async () => {
    const clientsCollection = await database.collections.get("clients");

    console.log(clientsCollection, "CLIENT COLLECTION");

    const allClients = await clientsCollection.query().fetch();

    console.log(allClients, "ALL CLIENT QUERY DB");

    setClients(allClients);
  };

  useEffect(() => {
    loadClientsWatermelon();
  }, []);

  const addClientWatermelon = async ({ name, cnpj, contact }) => {
    try {
      await database.write(async () => {
        await database.collections.get("clients").create((clients) => {
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

  const deleteClientWatermelon = async (props) => {
    try {
      const client = await database.get("clients").find(props);

      await database.write(async () => {
        await client.destroyPermanently();
      });

      loadClientsWatermelon();
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  console.log(clients, "CLIENTS WATERMELON");

  const fetchClient = async () => {
    try {
      const response = await api.get("/clients");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const query = useQuery({ queryKey: ["data"], queryFn: fetchClient });

  const postClient = async (data) => {
    try {
      const response = await api.post("/clients", {
        id: uuidv4(),
        name: data.name,
        cnpj: data.cnpj,
        contact: data.contact,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/clients/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    console.log(data, "PROPS");

    try {
      const response = await api.put(`/clients/${data.id}`, {
        id: data.id,
        name: data.name,
        cnpj: data.cnpj,
        contact: data.contact,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutationEdit = useMutation({
    mutationFn: handleEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const mutationCreate = useMutation({
    mutationFn: postClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  return {
    query,
    mutationCreate,
    mutationDelete,
    mutationEdit,
    clients,
    addClientWatermelon,
    deleteClientWatermelon,
  };
}
