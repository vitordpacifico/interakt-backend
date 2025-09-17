import { BottleType } from "../model/bottle";
import BottleRepository from "../repository/bottle-repository";

class BottleService {
  registerBottle = async (body: BottleType) => {
    const result = await BottleRepository.registerBottles(body);

    return {
      status: 200,
      message: { id: result.insertedId, ...body },
    };
  };
}

export default new BottleService();
