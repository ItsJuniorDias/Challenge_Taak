import { appSchema, Database, tableSchema } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import Client from "./model/Clients";

const clientSchema = tableSchema({
  name: "clients",
  columns: [
    { name: "name", type: "string" },
    { name: "cnpj", type: "string" },
    { name: "contact", type: "string" },
  ],
});

const appSchemaInstance = appSchema({
  version: 1,
  tables: [clientSchema],
});

const adapter = new SQLiteAdapter({
  dbName: "taak", // Nome do banco de dados
  schema: appSchemaInstance,
});

const database = new Database({
  adapter,
  modelClasses: [Client], // Aqui você vai adicionar suas classes de modelo
  actionsEnabled: true,
});

export default database;
