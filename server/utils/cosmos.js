// Utilidad para conectar con Azure Cosmos DB
import { CosmosClient } from '@azure/cosmos';
import 'dotenv/config';

// Configuración de Azure Cosmos DB
const endpoint = process.env.COSMOS_ENDPOINT || 'https://fish-monitor-dev.documents.azure.com:443/';
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || 'fish-monitor';
const containerId = process.env.COSMOS_CONTAINER || 'user';

// Variables para almacenar las conexiones
let client;
let database;
let container;

// Opción alternativa para desarrollo - una base de datos en memoria
let localUserStore = [];

// Verificar si estamos en modo de desarrollo sin Cosmos DB
const isLocalDev = !key && process.env.NODE_ENV !== 'production';

if (isLocalDev) {
  console.warn('⚠️ No se ha configurado la clave de Cosmos DB. Usando almacenamiento local en memoria para desarrollo.');
  
  // Crear implementaciones alternativas para desarrollo local
  container = {
    items: {
      create: async (item) => {
        console.log('Creando item en almacenamiento local:', item);
        localUserStore.push(item);
        return { resource: item };
      },
      query: async (querySpec) => {
        console.log('Consultando en almacenamiento local:', querySpec);
        let results = [...localUserStore];
        
        // Filtrar por username si es necesario
        if (querySpec.parameters?.length > 0) {
          const usernameParam = querySpec.parameters.find(p => p.name === '@username');
          const emailParam = querySpec.parameters.find(p => p.name === '@email');
          
          if (usernameParam) {
            results = results.filter(item => item.username === usernameParam.value);
          }
          
          if (emailParam) {
            results = results.filter(item => item.email === emailParam.value);
          }
        }
        
        return { resources: results };
      }
    },
    item: (id) => ({
      read: async () => {
        const user = localUserStore.find(item => item.id === id);
        return { resource: user || null };
      }
    })
  };
} else {
  // Modo normal con Cosmos DB
  try {
    console.log('Inicializando cliente de Cosmos DB con endpoint:', endpoint);
    if (!key) {
      throw new Error('La clave de Cosmos DB no está configurada. Revisa tus variables de entorno.');
    }
    
    client = new CosmosClient({ 
      endpoint, 
      key,
      connectionPolicy: {
        enableEndpointDiscovery: false
      }
    });
    database = client.database(databaseId);
    container = database.container(containerId);
    console.log('Cliente de Cosmos DB inicializado correctamente');
  } catch (error) {
    console.error('Error al inicializar cliente de Cosmos DB:', error.message);
    console.error(error.stack);
  }
}

// Función para inicializar la base de datos y el contenedor
export async function initializeCosmosDB() {
  if (isLocalDev) {
    console.log('Modo de desarrollo local: no es necesario inicializar Cosmos DB');
    return { database: null, container };
  }
  
  try {
    console.log(`Intentando conectar a: ${endpoint}`);
    
    if (!client) {
      throw new Error('Cliente de Cosmos DB no inicializado. Verifica las credenciales.');
    }
    
    // Verificar si la base de datos existe, si no crearla
    const { database: db } = await client.databases.createIfNotExists({
      id: databaseId
    });
    console.log(`Base de datos '${db.id}' asegurada`);

    // Verificar si el contenedor existe, si no crearlo
    const { container: cont } = await db.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ['/username'] }
    });
    console.log(`Contenedor '${cont.id}' asegurado`);
    
    database = db;
    container = cont;
    
    return { database: db, container: cont };
  } catch (error) {
    console.error('Error al inicializar Cosmos DB:', error.message);
    console.error(error.stack);
    throw error;
  }
}

export { client, database, container }; 