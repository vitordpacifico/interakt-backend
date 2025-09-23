import { Request } from "express";
import { GetUser, RegisterBottleToUser, User } from "../model/user";
import UserService from "../service/user-service";

class UserController {
  getUserByEmailAndPassword = async (evt: Request) => {
    try {
      const validatedBody = GetUser.parse(evt.body);
      const response = await UserService.getUserByEmailAndPassword(
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

  registerUser = async (evt: Request) => {
    try {
      const validatedBody = User.parse(evt.body);
      const response = await UserService.registerUser(validatedBody);

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

  registerBottleToUser = async (evt: Request) => {
    try {
      const validatedBody = RegisterBottleToUser.parse(evt.body);
      const response = await UserService.registerBottleToUser(validatedBody);

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

export default new UserController();
