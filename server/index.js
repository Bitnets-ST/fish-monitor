// Inicialización del servidor
import { initializeCosmosDB } from './utils/cosmos';
import { createTestUser } from './utils/init-test-user';
import 'dotenv/config';

export default async () => {
  try {
    console.log('Inicializando Azure Cosmos DB...');
    
    // Inicializar Cosmos DB
    await initializeCosmosDB();
    
    console.log('Conexión con Azure Cosmos DB establecida correctamente.');
    
    // Crear usuario de prueba
    await createTestUser();
  } catch (error) {
    console.error('Error al inicializar el servidor:', error);
  }
}; 