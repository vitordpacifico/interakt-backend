import { BottleType } from "../model/bottle";
import { RegisterBottleToUserType, UserType } from "../model/user";
import { connect } from "../utils/db";
import { ObjectId } from "mongodb";

class UserRepository {
  private getCollection = async () => {
    return (await connect()).collection<UserType>("USER");
  };

  private getBottleCollection = async () => {
    return (await connect()).collection<BottleType>("BOTTLES");
  };

  async getUserByEmailAndPassword(email: string, senha: string) {
    return (await this.getCollection()).findOne({ email, senha });
  }

  async registerUser(body: UserType) {
    return (await this.getCollection()).insertOne(body);
  }

  async registerBottleToUser(body: RegisterBottleToUserType) {
    const bottleData = await (
      await this.getBottleCollection()
    )
      .aggregate([
        {
          $match: {
            _id: new ObjectId(body.idGarrafa),
          },
        },
        {
          $project: {
            colecao: "$categoria.colecao",
            item: "$categoria.item",
          },
        },
      ])
      .toArray();

    if (bottleData.length === 0) {
      return {
        status: 404,
        message: "Bottle not founded",
      };
    }

    const bottle = bottleData[0];

    const precoAtual = Math.floor(Math.random() * (1000 - 400 + 1)) + 400;
    const carteiraData = {
      idVinho: body.idGarrafa,
      tokenNFT: `NFT_${body.idGarrafa}_${Date.now()}`,
      preçoAtual: precoAtual,
      colecao: bottle.colecao,
      item: bottle.item,
    };

    const updatedUser = await (
      await this.getCollection()
    ).findOneAndUpdate(
      { _id: new ObjectId(body.idUser) } as any,
      {
        $push: {
          carteira: carteiraData,
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!updatedUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    return {
      status: 200,
      message: updatedUser,
    };
  }
}

export default new UserRepository();
