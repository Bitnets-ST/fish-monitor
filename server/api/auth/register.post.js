// API para registro de usuarios
import { container } from '../../utils/cosmos';
import { hashPassword, generateToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Obtener datos del cuerpo de la petición
    const body = await readBody(event);
    const { username, email, password, name } = body;
    
    // Validar datos
    if (!username || !email || !password || !name) {
      return {
        statusCode: 400,
        body: { error: 'Todos los campos son obligatorios' }
      };
    }
    
    // Comprobar si el usuario ya existe
    const querySpec = {
      query: "SELECT * FROM c WHERE c.username = @username OR c.email = @email",
      parameters: [
        { name: "@username", value: username },
        { name: "@email", value: email }
      ]
    };
    
    const { resources: existingUsers } = await container.items.query(querySpec).fetchAll();
    
    if (existingUsers.length > 0) {
      return {
        statusCode: 409,
        body: { error: 'El usuario o correo electrónico ya está registrado' }
      };
    }
    
    // Encriptar contraseña
    const hashedPassword = await hashPassword(password);
    
    // Crear usuario en Cosmos DB
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      name,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    const { resource: createdUser } = await container.items.create(newUser);
    
    // Generar token JWT
    const token = generateToken({
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email,
      name: createdUser.name,
      isAdmin: createdUser.isAdmin
    });
    
    // Devolver respuesta
    return {
      statusCode: 201,
      body: {
        message: 'Usuario registrado correctamente',
        token,
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
          name: createdUser.name,
          isAdmin: createdUser.isAdmin
        }
      }
    };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return {
      statusCode: 500,
      body: { error: 'Error interno del servidor' }
    };
  }
}); 