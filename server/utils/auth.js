// Utilidad para autenticación con JWT
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// Configuración de JWT
const JWT_SECRET = process.env.JWT_SECRET || 'fish_monitor_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Genera un hash para la contraseña
 * @param {string} password Contraseña a encriptar
 * @returns {Promise<string>} Hash de la contraseña
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compara una contraseña con su hash
 * @param {string} password Contraseña a verificar
 * @param {string} hashedPassword Hash almacenado
 * @returns {Promise<boolean>} Resultado de la comparación
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Genera un token JWT
 * @param {Object} payload Datos a incluir en el token
 * @returns {string} Token JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifica un token JWT
 * @param {string} token Token a verificar
 * @returns {Object|null} Datos del token si es válido, null si no
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}; 