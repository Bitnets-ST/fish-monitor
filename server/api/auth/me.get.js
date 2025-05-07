// API para obtener el perfil del usuario autenticado
import { container } from '../../utils/cosmos';
import { verifyToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Obtener token del encabezado de autorización
    const authHeader = getHeader(event, 'authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: { error: 'No autorizado' }
      };
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return {
        statusCode: 401,
        body: { error: 'Token inválido o expirado' }
      };
    }
    
    // Buscar usuario en Cosmos DB
    const { resource: user } = await container.item(decoded.id).read();
    
    if (!user) {
      return {
        statusCode: 404,
        body: { error: 'Usuario no encontrado' }
      };
    }
    
    // Devolver perfil de usuario (sin la contraseña)
    const { password, ...userProfile } = user;
    
    return {
      statusCode: 200,
      body: { user: userProfile }
    };
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    return {
      statusCode: 500,
      body: { error: 'Error interno del servidor' }
    };
  }
}); 