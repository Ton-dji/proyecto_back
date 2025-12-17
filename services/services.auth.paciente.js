import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Paciente from "../models/model.paciente.js";

const registrarPaciente = async ({ nombre, email, password, telefono }) => {
  // 1. Verificar si existe
  let paciente = await Paciente.findOne({ email });
  if (paciente) {
    throw new Error("El paciente ya existe");
  }

  // 2. Crear paciente
  paciente = new Paciente({ nombre, email, password, telefono });

  // 3. Encriptar password
  const salt = await bcrypt.genSalt(10);
  paciente.password = await bcrypt.hash(password, salt);

  await paciente.save();
  return { msg: "Paciente registrado exitosamente" };
};

const loginPaciente = async ({ email, password }) => {
  // 1. Verificar paciente
  const paciente = await Paciente.findOne({ email });
  if (!paciente) {
    throw new Error("Credenciales inválidas");
  }

  // 2. Verificar password
  if (!paciente.password) {
    throw new Error("Este paciente no tiene contraseña configurada");
  }

  const esCorrecto = await bcrypt.compare(password, paciente.password);
  if (!esCorrecto) {
    throw new Error("Credenciales inválida");
  }

  // 3. Crear Token (JWT)
  const payload = { paciente: { id: paciente.id } };

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
    paciente: {
      id: paciente.id,
      nombre: paciente.nombre,
      email: paciente.email,
    },
  };
};

const activarCuentaPaciente = async ({ email, password }) => {
  // 1. Buscar paciente
  const paciente = await Paciente.findOne({ email });
  if (!paciente) {
    throw new Error("Paciente no encontrado");
  }

  // 2. Verificar si ya tiene password
  if (paciente.password) {
    throw new Error("Esta cuenta ya está activada. Por favor inicia sesión.");
  }

  // 3. Encriptar y guardar password
  const salt = await bcrypt.genSalt(10);
  paciente.password = await bcrypt.hash(password, salt);

  await paciente.save();
  return { msg: "Cuenta activada exitosamente. Ahora puedes iniciar sesión." };
};

export default {
  registrarPaciente,
  loginPaciente,
  activarCuentaPaciente,
};
