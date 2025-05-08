// API para obtener el perfil del usuario autenticado
import { container } from '../../utils/cosmos';
import { verifyToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  try {
    // Obtener token del encabezado de autorización
    const authHeader = getHeader(event, 'authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      setResponseStatus(event, 401);
      return { error: 'No autorizado' };
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Verificando token JWT');
    const decoded = verifyToken(token);
    
    if (!decoded) {
      setResponseStatus(event, 401);
      return { error: 'Token inválido o expirado' };
    }
    
    console.log('Token verificado para el usuario ID:', decoded.id);
    
    try {
      // Buscar usuario en Cosmos DB
      console.log('Buscando usuario en base de datos');
      const { resource: user } = await container.item(decoded.id).read();
      
      if (!user) {
        setResponseStatus(event, 404);
        return { error: 'Usuario no encontrado' };
      }
      
      // Devolver perfil de usuario (sin la contraseña)
      const { password, ...userProfile } = user;
      console.log('Perfil de usuario encontrado:', userProfile.username);
      
      return { user: userProfile };
    } catch (dbError) {
      console.error('Error al buscar usuario en la base de datos:', dbError);
      throw new Error(`Error de base de datos: ${dbError.message}`);
    }
  } catch (error) {
    console.error('Error completo al obtener perfil:', error);
    console.error('Stack:', error.stack);
    setResponseStatus(event, 500);
    return { error: `Error interno del servidor: ${error.message}` };
  }
}); 