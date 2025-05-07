// Utilidad para conectar con Azure Cosmos DB
import { CosmosClient } from '@azure/cosmos';
import 'dotenv/config';

// Configuración de Azure Cosmos DB
const endpoint = process.env.COSMOS_ENDPOINT || 'https://fish-monitor-dev.documents.azure.com:443/';
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || 'fish-monitor';
const containerId = process.env.COSMOS_CONTAINER || 'user';

if (!key) {
  console.error('Error: La clave de Cosmos DB no está configurada. Por favor, verifica tu archivo .env');
}

// Crear cliente de Cosmos DB
const client = new CosmosClient({ 
  endpoint, 
  key,
  connectionPolicy: {
    enableEndpointDiscovery: false
  }
});
const database = client.database(databaseId);
const container = database.container(containerId);

// Función para inicializar la base de datos y el contenedor
export async function initializeCosmosDB() {
  try {
    console.log(`Intentando conectar a: ${endpoint}`);
    
    // Verificar si la base de datos existe, si no crearla
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    });
    console.log(`Base de datos '${database.id}' asegurada`);

    // Verificar si el contenedor existe, si no crearlo
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ['/username'] }
    });
    console.log(`Contenedor '${container.id}' asegurado`);
    
    return { database, container };
  } catch (error) {
    console.error('Error al inicializar Cosmos DB:', error);
    throw error;
  }
}

export { client, database, container }; 