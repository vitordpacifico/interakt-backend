import { BottleType } from "../model/bottle";
import { connect } from "../utils/db";

class BottleRepository {
  private getCollection = async () => {
    console.log("Table: BOTTLES");
    return (await connect()).collection<BottleType>("BOTTLES");
  };

  async registerBottles(body: BottleType) {
    return await (await this.getCollection()).insertOne(body);
  }
}

export default new BottleRepository();
