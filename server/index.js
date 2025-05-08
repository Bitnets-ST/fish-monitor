// Inicialización del servidor
import { initializeCosmosDB } from './utils/cosmos';
import { createTestUser } from './utils/init-test-user';
import 'dotenv/config';

export default async () => {
  console.log('Inicializando servidor...');
  
  try {
    console.log('Inicializando Azure Cosmos DB...');
    
    // Intentar inicializar Cosmos DB
    await initializeCosmosDB();
    
    console.log('Conexión con Azure Cosmos DB establecida correctamente.');
    
    // Crear usuario de prueba
    await createTestUser();
    
    console.log('Servidor inicializado correctamente.');
  } catch (error) {
    console.error('Error al inicializar el servidor:', error.message);
    console.error('Stacktrace:', error.stack);
    
    // El servidor seguirá funcionando, pero se registra el error
    console.warn('El servidor continuará pero algunas funciones pueden no estar disponibles.');
  }
}; 