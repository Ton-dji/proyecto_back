import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Sanitario from "../models/model.sanitario.js";

const registrarSanitario = async ({ nombre, email, password, cedula }) => {
  // 1. Verificar si existe
  let sanitario = await Sanitario.findOne({ email });
  if (sanitario) {
    throw new Error("El usuario ya existe");
  }

  // 2. Crear usuario
  sanitario = new Sanitario({ nombre, email, password, cedula });

  // 3. Encriptar password
  const salt = await bcrypt.genSalt(10);
  sanitario.password = await bcrypt.hash(password, salt);

  await sanitario.save();
  return { msg: "Sanitario creado exitosamente" };
};

const loginSanitario = async ({ email, password }) => {
  // 1. Verificar usuario
  const sanitario = await Sanitario.findOne({ email });
  if (!sanitario) {
    throw new Error("Credenciales inválidas");
  }

  // 2. Verificar password
  const esCorrecto = await bcrypt.compare(password, sanitario.password);
  if (!esCorrecto) {
    throw new Error("Contraseña inválida");
  }

  // 3. Crear Token (JWT)
  const payload = { user: { id: sanitario.id } };

  // Promisify jwt.sign for cleaner async/await usage
  const token = await new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

  return {
    token,
    sanitario: {
      id: sanitario.id,
      nombre: sanitario.nombre,
      role: sanitario.role,
    },
  };
};

export default {
  registrarSanitario,
  loginSanitario,
};
