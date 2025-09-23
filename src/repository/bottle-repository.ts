import { BottleType, WineTypeEnum } from "../model/bottle";
import { connect } from "../utils/db";

class BottleRepository {
  private getCollection = async () => {
    return (await connect()).collection<BottleType>("BOTTLES");
  };

  async registerBottles(body: BottleType) {
    return await (await this.getCollection()).insertOne(body);
  }

  async getBottleByType(type: WineTypeEnum) {
    return (await this.getCollection()).find({ tipo: type }).toArray();
  }

  async getAllBottles() {
    return (await this.getCollection()).find({}).toArray();
  }

  async getBottleByNameAndYear(nome: string, safra: number) {
    return (await this.getCollection()).findOne({ nome, safra });
  }
}

export default new BottleRepository();
