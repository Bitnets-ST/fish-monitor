// API para inicio de sesión de usuarios
import { connectToDatabase } from '../../utils/mongodb';
import { comparePassword, generateToken } from '../../utils/auth';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
  try {
    // Obtener datos del cuerpo de la petición
    const body = await readBody(event);
    const { email, password } = body;
    
    // Validar datos
    if (!email || !password) {
      return {
        statusCode: 400,
        body: { error: 'El correo electrónico y la contraseña son obligatorios' }
      };
    }
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: { error: 'Por favor, ingresa un correo electrónico válido' }
      };
    }
    
    // Conectar a MongoDB
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('user');
    
    // Buscar usuario en MongoDB por email
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      console.error('Usuario no encontrado para el email:', email);
      return {
        statusCode: 401,
        body: { error: 'Correo o contraseña incorrectos' }
      };
    }
    
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
      id: user._id.toString(),
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
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role || 'user',
          isAdmin: (user.role === 'admin') || false
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