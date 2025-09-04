import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

class Client extends Model {
  static table = "clients";

  @field("name") name;
  @field("cnpj") cnpj;
  @field("contact") contact;
}

export default Client;
