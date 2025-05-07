// API para inicio de sesión de usuarios
import { container } from '../../utils/cosmos';
import { comparePassword, generateToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Obtener datos del cuerpo de la petición
    const body = await readBody(event);
    const { username, password } = body;
    
    // Validar datos
    if (!username || !password) {
      return {
        statusCode: 400,
        body: { error: 'El usuario y la contraseña son obligatorios' }
      };
    }
    
    // Buscar usuario en Cosmos DB
    const querySpec = {
      query: "SELECT * FROM c WHERE c.username = @username",
      parameters: [
        { name: "@username", value: username }
      ]
    };
    
    const { resources: users } = await container.items.query(querySpec).fetchAll();
    
    if (users.length === 0) {
      return {
        statusCode: 401,
        body: { error: 'Usuario o contraseña incorrectos' }
      };
    }
    
    const user = users[0];
    
    // Verificar contraseña
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: { error: 'Usuario o contraseña incorrectos' }
      };
    }
    
    // Generar token JWT
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    });
    
    // Devolver respuesta
    return {
      statusCode: 200,
      body: {
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
        }
      }
    };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return {
      statusCode: 500,
      body: { error: 'Error interno del servidor' }
    };
  }
}); 