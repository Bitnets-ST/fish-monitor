// API para registro de usuarios
import { container } from '../../utils/cosmos';
import { hashPassword, generateToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Obtener datos del cuerpo de la petición
    const body = await readBody(event);
    const { username, email, password, name } = body;
    
    console.log('Datos de registro recibidos:', { username, email, name, passwordLength: password?.length });
    
    // Validar datos
    if (!username || !email || !password || !name) {
      setResponseStatus(event, 400);
      return { error: 'Todos los campos son obligatorios' };
    }
    
    try {
      // Comprobar si el usuario ya existe
      const querySpec = {
        query: "SELECT * FROM c WHERE c.username = @username OR c.email = @email",
        parameters: [
          { name: "@username", value: username },
          { name: "@email", value: email }
        ]
      };
      
      console.log('Ejecutando consulta para verificar usuario existente');
      const { resources: existingUsers } = await container.items.query(querySpec).fetchAll();
      console.log('Usuarios existentes encontrados:', existingUsers.length);
      
      if (existingUsers.length > 0) {
        setResponseStatus(event, 409);
        return { error: 'El usuario o correo electrónico ya está registrado' };
      }
    } catch (dbError) {
      console.error('Error al consultar la base de datos:', dbError);
      throw new Error(`Error de base de datos: ${dbError.message}`);
    }
    
    try {
      // Encriptar contraseña
      console.log('Encriptando contraseña');
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
      
      console.log('Creando nuevo usuario en Cosmos DB');
      const { resource: createdUser } = await container.items.create(newUser);
      console.log('Usuario creado correctamente:', createdUser.id);
      
      // Generar token JWT
      console.log('Generando token JWT');
      const token = generateToken({
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        name: createdUser.name,
        isAdmin: createdUser.isAdmin
      });
      
      // Devolver respuesta
      setResponseStatus(event, 201);
      return {
        message: 'Usuario registrado correctamente',
        token,
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
          name: createdUser.name,
          isAdmin: createdUser.isAdmin
        }
      };
    } catch (createError) {
      console.error('Error al crear usuario:', createError);
      throw new Error(`Error al crear usuario: ${createError.message}`);
    }
  } catch (error) {
    console.error('Error completo al registrar usuario:', error);
    console.error('Stack:', error.stack);
    setResponseStatus(event, 500);
    return { error: `Error interno del servidor: ${error.message}` };
  }
}); 