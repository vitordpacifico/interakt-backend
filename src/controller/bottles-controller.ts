import { Request } from "express";
import BottleService from "../service/bottle-service";
import { Bottle } from "../model/bottle";

class BottlesController {
  registerBottle = async (evt: Request) => {
    try {
      const validatedBody = Bottle.parse(evt.body);
      const response = await BottleService.registerBottle(validatedBody);

      return {
        status: response.status,
        message: response.message,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Erro ao cadastrar garrafa",
      };
    }
  };
}

export default new BottlesController();
