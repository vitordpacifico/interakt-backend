import express from "express";
import router from "./routes/router";
import cors from "cors";
import { pingDatabase } from "./utils/db";

async function startServer() {
  try {
    const isConnected = await pingDatabase();
    if (!isConnected) {
      throw new Error("Falha na conexão com o banco de dados");
    }

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
      console.log(`📡 API disponível em: http://localhost:${port}/interakt`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
    process.exit(1); // Encerra o processo se não conseguir conectar
  }
}

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
};

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/interakt", router);
startServer();
