import {
  GetUserType,
  RegisterBottleToUserType,
  UserType,
} from "./../model/user";
import UserRepository from "../repository/user-repository";

class UserService {
  getUserByEmailAndPassword = async (body: GetUserType) => {
    const result = await UserRepository.getUserByEmailAndPassword(
      body.email,
      body.senha
    );

    if (result == null) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    return {
      status: 200,
      message: result,
    };
  };

  registerUser = async (body: UserType) => {
    await UserRepository.registerUser(body);

    return {
      status: 201,
      message: body,
    };
  };

  registerBottleToUser = async (body: RegisterBottleToUserType) => {
    const result = await UserRepository.registerBottleToUser(body);

    return {
      status: result.status,
      message: result.message,
    };
  };
}

export default new UserService();
