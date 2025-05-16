// Utilidad para conectar con MongoDB Atlas
import { MongoClient } from 'mongodb';
import 'dotenv/config';

// Configuración de MongoDB
const uri = process.env.MONGODB_URI || 'mongodb+srv://ticbitnets:Do96G80S1eMl7hxV@cluster0.xze14eu.mongodb.net/fish-monitor?retryWrites=true&w=majority';
const dbName = process.env.MONGODB_DB || 'fish-monitor';

if (!uri) {
  console.error('Error: La URI de MongoDB no está configurada. Por favor, verifica tu archivo .env');
}

// Cache de la conexión y cliente
let cachedClient = null;
let cachedDb = null;

// Función para conectar a MongoDB
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Conectar al cluster de MongoDB
    const client = new MongoClient(uri, {
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('Conectado a MongoDB Atlas');

    // Seleccionar la base de datos
    const db = client.db(dbName);

    // Configurar índices únicos para username y email
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    // Cachear la conexión
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

// Exportar la función de conexión
export default connectToDatabase;
