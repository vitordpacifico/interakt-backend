import z from "zod";

export const User = z.object({
  _id: z.string().describe("ID do user, gerado pelo mongo").optional(),

  email: z.string().describe("Email do user"),

  senha: z.string().describe("Senha do user"),

  carteira: z
    .array(
      z.object({
        idVinho: z.string().describe("ID da garrafa, gerado pelo mongo"),

        tokenNFT: z.string().describe("token vinculado à nft da garrafa"),

        preçoAtual: z.number().describe("preço em dionisium"),

        colecao: z.string().describe("coleção da nft da garrafa"),

        item: z.string().describe("nome do item da coleção do nft da garrafa"),
      })
    )
    .default([]),
});

export const GetUser = z.object({
  email: z.string().describe("Email do user"),

  senha: z.string().describe("Senha do user"),
});

export const RegisterBottleToUser = z.object({
  idUser: z.string().describe("id do user"),

  idGarrafa: z.string().describe("id da garrafa"),
});

export type UserType = z.infer<typeof User>;

export type GetUserType = z.infer<typeof GetUser>;

export type RegisterBottleToUserType = z.infer<typeof RegisterBottleToUser>;
