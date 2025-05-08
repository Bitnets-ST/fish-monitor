// Script para inicializar un usuario de prueba
import { container } from './cosmos';
import { hashPassword } from './auth';

export async function createTestUser() {
  try {
    console.log('Intentando crear usuario de prueba...');
    
    // Datos del usuario de prueba
    const testUser = {
      username: 'bitnets',
      email: 'prueba@bitnets.com',
      name: 'Usuario de Prueba',
      password: '123456'
    };
    
    try {
      // Comprobar si el usuario ya existe
      const querySpec = {
        query: "SELECT * FROM c WHERE c.username = @username",
        parameters: [
          { name: "@username", value: testUser.username }
        ]
      };
      
      const { resources: existingUsers } = await container.items.query(querySpec).fetchAll();
      
      if (existingUsers.length > 0) {
        console.log('El usuario de prueba ya existe.');
        return;
      }
      
      // Encriptar contraseña
      const hashedPassword = await hashPassword(testUser.password);
      
      // Crear usuario en Cosmos DB
      const newUser = {
        id: `user-${Date.now()}`,
        username: testUser.username,
        email: testUser.email,
        name: testUser.name,
        password: hashedPassword,
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      
      const { resource: createdUser } = await container.items.create(newUser);
      
      console.log('Usuario de prueba creado exitosamente:');
      console.log({
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        name: createdUser.name
      });
    } catch (error) {
      console.error('Error específico al crear usuario de prueba:', error.message);
      console.error(error.stack);
    }
  } catch (error) {
    console.error('Error general al crear usuario de prueba:', error.message);
    console.error(error.stack);
  }
} 