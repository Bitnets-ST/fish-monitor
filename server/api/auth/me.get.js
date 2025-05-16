// API para obtener el perfil del usuario autenticado
import { connectToDatabase } from '../../utils/mongodb';
import { verifyToken } from '../../utils/auth';
import { ObjectId } from 'mongodb';

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
    
    // Conectar a MongoDB
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Buscar usuario en MongoDB
    const user = await usersCollection.findOne(
      { _id: new ObjectId(decoded.id) },
      { projection: { password: 0 } } // Excluir la contraseña
    );
    
    if (!user) {
      return {
        statusCode: 404,
        body: { error: 'Usuario no encontrado' }
      };
    }
    
    // Convertir _id a string para el cliente
    const userProfile = {
      ...user,
      id: user._id.toString(),
      isAdmin: (user.role === 'admin') || false
    };
    delete userProfile._id;
    
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