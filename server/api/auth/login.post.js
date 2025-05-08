// API para inicio de sesión de usuarios
import { container } from '../../utils/cosmos';
import { comparePassword, generateToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Obtener datos del cuerpo de la petición
    const body = await readBody(event);
    const { username, password } = body;
    
    console.log('Intento de login para usuario:', username);
    
    // Validar datos
    if (!username || !password) {
      setResponseStatus(event, 400);
      return { error: 'El usuario y la contraseña son obligatorios' };
    }
    
    try {
      // Buscar usuario en Cosmos DB
      const querySpec = {
        query: "SELECT * FROM c WHERE c.username = @username",
        parameters: [
          { name: "@username", value: username }
        ]
      };
      
      console.log('Ejecutando consulta para buscar usuario');
      const { resources: users } = await container.items.query(querySpec).fetchAll();
      console.log('Usuarios encontrados:', users.length);
      
      if (users.length === 0) {
        setResponseStatus(event, 401);
        return { error: 'Usuario o contraseña incorrectos' };
      }
      
      const user = users[0];
      
      // Verificar contraseña
      console.log('Verificando contraseña');
      const isPasswordValid = await comparePassword(password, user.password);
      
      if (!isPasswordValid) {
        setResponseStatus(event, 401);
        return { error: 'Usuario o contraseña incorrectos' };
      }
      
      // Generar token JWT
      console.log('Generando token JWT');
      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      });
      
      console.log('Login exitoso para usuario:', username);
      
      // Devolver respuesta
      return {
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin
        }
      };
    } catch (dbError) {
      console.error('Error en la consulta de base de datos:', dbError);
      throw new Error(`Error de base de datos: ${dbError.message}`);
    }
  } catch (error) {
    console.error('Error completo al iniciar sesión:', error);
    console.error('Stack:', error.stack);
    setResponseStatus(event, 500);
    return { error: `Error interno del servidor: ${error.message}` };
  }
}); 