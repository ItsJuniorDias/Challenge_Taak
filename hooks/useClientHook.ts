import "react-native-get-random-values";
import { api } from "@/service/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type DataProps = {
  id: number;
  name: string;
  cnpj: string;
  contact: string;
}[];

export default function useClientHook() {
  const queryClient = useQueryClient();

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
  };
}
