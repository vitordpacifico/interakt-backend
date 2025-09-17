import z, { ZodType } from "zod";

// Enums para valores específicos
const WineType = z.enum(
  ["tinto", "branco", "rose", "espumante", "fortificado"],
  {
    error: "Tipo deve ser: tinto, branco, rosé, espumante ou fortificado",
  }
);

const Sweetness = z.enum(["seco", "meio-seco", "suave", "doce"], {
  error: "Doçura deve ser: seco, meio-seco, suave ou doce",
});

export const Bottle = z.object({
  // ID e referências
  id: z.string().describe("ID da garrafa, gerado pelo mongo").optional(),

  // Características Básicas
  nome: z
    .string({ error: "Nome é obrigatório" })
    .describe("Nome/rótulo do vinho")
    .min(1, "Nome não pode estar vazio"),

  marcaId: z
    .string({ error: "ID da marca deve ser uma string" })
    .describe("ID da marca/vinícola, linkando com a tabela de marcas"),

  safra: z
    .number({ error: "Safra deve ser um número" })
    .describe("Ano da colheita das uvas")
    .min(1800, "Safra muito antiga")
    .max(new Date().getFullYear(), "Safra não pode ser futura"),

  regiao: z.string().describe("Denominação de origem"),

  pais: z.string().describe("País de produção"),

  // Características do Vinho
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

  docura: Sweetness.describe("Nível de doçura do vinho"),

  // Características Técnicas
  dataEnvase: z.date().describe("Data quando foi engarrafado"),

  dataValidade: z.date().describe("Prazo de consumo"),

  lote: z.string().describe("Identificação do lote de produção"),

  ph: z
    .number()
    .describe("Nível de pH (acidez)")
    .min(0, "pH não pode ser negativo")
    .max(14, "pH não pode ser maior que 14"),

  acidez: z
    .number()
    .describe("Níveis de ácido tartárico")
    .min(0, "Acidez não pode ser negativa"),

  // Características Sensoriais
  cor: z.string().describe("Intensidade e tonalidade da cor"),

  aroma: z.string().describe("Perfil aromático (frutado, floral, amadeirado)"),

  sabor: z.string().describe("Notas de degustação"),

  codigoBarras: z.string().describe("Código de barras EAN/UPC"),
});

export type BottleType = z.infer<typeof Bottle>;
