import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

class Client extends Model {
  static table = "clients";

  @field("name") name!: string;
  @field("cnpj") cnpj!: string;
  @field("contact") contact!: string;
}

export default Client;
