import {
  BottleType,
  GetBottleByNameAndYearType,
  WineTypeEnum,
} from "../model/bottle";
import BottleRepository from "../repository/bottle-repository";

class BottleService {
  registerBottle = async (body: BottleType) => {
    await BottleRepository.registerBottles(body);

    return {
      status: 201,
      message: body,
    };
  };

  getBottleByType = async (type: WineTypeEnum) => {
    const result = await BottleRepository.getBottleByType(type);

    return {
      status: 200,
      message: result,
    };
  };

  getAllBottles = async () => {
    const result = await BottleRepository.getAllBottles();

    return {
      status: 200,
      message: result,
    };
  };

  getBottleByNameAndYear = async (body: GetBottleByNameAndYearType) => {
    const result = await BottleRepository.getBottleByNameAndYear(
      body.nome,
      body.safra
    );

    if (result == null) {
      return {
        status: 404,
        message: "Bottle not found"
      }
    }
    
    return {
      status: 200,
      message: result,
    };
  };
}

export default new BottleService();
