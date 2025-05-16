// API para registro de usuarios
import { connectToDatabase } from '../../utils/mongodb';
import { hashPassword, generateToken } from '../../utils/auth';
import { ObjectId } from 'mongodb';

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
    
    // Conectar a MongoDB
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Comprobar si el usuario ya existe
    const existingUser = await usersCollection.findOne({
      $or: [
        { username },
        { email }
      ]
    });
    
    if (existingUser) {
      return {
        statusCode: 400,
        body: { error: 'El nombre de usuario o correo electrónico ya está en uso' }
      };
    }
    
    // Encriptar contraseña
    const hashedPassword = await hashPassword(password);
    
    // Crear el nuevo usuario en MongoDB
    const newUser = {
      username,
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(newUser);
    const createdUser = {
      _id: result.insertedId,
      ...newUser
    };
    
    // Generar token JWT
    const token = generateToken({
      id: createdUser._id.toString(),
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