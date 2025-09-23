import z from "zod";

// Enums para valores específicos
const WineType = z.enum(
  ["tinto", "branco", "rose", "espumante", "fortificado"],
  {
    error: "Tipo deve ser: tinto, branco, rosé, espumante ou fortificado",
  }
);

export const Bottle = z.object({
  _id: z.string().describe("ID da garrafa, gerado pelo mongo").optional(),

  nome: z
    .string({ error: "Nome é obrigatório" })
    .describe("Nome/rótulo do vinho")
    .min(1, "Nome não pode estar vazio"),

  marca: z
    .string({ error: "ID da marca deve ser uma string" })
    .describe("marca/vinícola"),

  safra: z
    .number({ error: "Safra deve ser um número" })
    .describe("Ano da colheita das uvas")
    .min(1800, "Safra muito antiga")
    .max(new Date().getFullYear(), "Safra não pode ser futura"),

  regiao: z.string().describe("Denominação de origem"),

  pais: z.string().describe("País de produção"),

  tipo: WineType.describe("Tipo de vinho"),

  variedade: z
    .string()
    .describe("Variedade/casta das uvas (ex: Cabernet Sauvignon)"),

  teorAlcoolico: z
    .number()
    .describe("Percentual de álcool")
    .min(0, "Teor alcoólico não pode ser negativo")
    .max(100, "Teor alcoólico não pode ser maior que 100%"),

  volume: z
    .number()
    .describe("Volume em mililitros (ex: 750)")
    .positive("Volume deve ser positivo"),

  lote: z.string().describe("Identificação do lote de produção"),

  cor: z.string().describe("Intensidade e tonalidade da cor"),

  aroma: z.string().describe("Perfil aromático (frutado, floral, amadeirado)"),

  sabor: z.string().describe("Notas de degustação"),

  codigoBarras: z.string().describe("Código de barras EAN/UPC"),

  tempoMaturacao: z.number().describe("Tempo de maturação em meses"),

  categoria: z.object({
    colecao: z.string().describe("coleção da nft da garrafa"),

    item: z.string().describe("nome do item da coleção do nft da garrafa"),
  }),

  combinacoes: z.array(z.string()).length(5),
});

export const GetBottleByType = z.object({
  tipo: WineType.describe("Tipo de vinho"),
});

export const GetBottleByNameAndYear = z.object({
  nome: z
    .string({ error: "Nome é obrigatório" })
    .describe("Nome/rótulo do vinho")
    .min(1, "Nome não pode estar vazio"),
  safra: z
    .number({ error: "Safra deve ser um número" })
    .describe("Ano da colheita das uvas")
    .min(1800, "Safra muito antiga")
    .max(new Date().getFullYear(), "Safra não pode ser futura"),
});

export type BottleType = z.infer<typeof Bottle>;

export type WineTypeEnum = z.infer<typeof WineType>;

export type GetBottleByNameAndYearType = z.infer<typeof GetBottleByNameAndYear>;
