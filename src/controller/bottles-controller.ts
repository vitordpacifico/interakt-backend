import { GetBottleByNameAndYear, GetBottleByType } from "./../model/bottle";
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
        message: error,
      };
    }
  };

  getBottle = async (evt: Request) => {
    try {
      if (Object.keys(evt.body).length === 0) {
        const response = await BottleService.getAllBottles();

        return {
          status: response.status,
          message: response.message,
        };
      }
      const validatedBody = GetBottleByType.parse(evt.body);
      const response = await BottleService.getBottleByType(validatedBody.tipo);

      return {
        status: response.status,
        message: response.message,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: error,
      };
    }
  };

  getBottleByNameAndYear = async (evt: Request) => {
    try {
      const validatedBody = GetBottleByNameAndYear.parse(evt.body);
      const response = await BottleService.getBottleByNameAndYear(
        validatedBody
      );

      return {
        status: response.status,
        message: response.message,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: error,
      };
    }
  };
}

export default new BottlesController();
