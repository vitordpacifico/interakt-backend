import { Db, MongoClient } from "mongodb";

let singleton: Db;

export async function connect() {
  if (singleton) return singleton;

  console.log("Conectando ao banco...");

  const client = new MongoClient(
    "mongodb+srv://db_user:J6mV3QvpkZVBNhVx@interakt.e8iyjhj.mongodb.net/",
    {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    }
  );

  const db = client.db("INTERAKT");
  singleton = db;

  return singleton;
}

export async function pingDatabase(): Promise<boolean> {
  try {
    const db = await connect();
    await db.admin().ping();
    console.log("🏓 Ping no banco de dados: OK");
    return true;
  } catch (error) {
    console.error("❌ Erro no ping do banco:", error);
    return false;
  }
}
