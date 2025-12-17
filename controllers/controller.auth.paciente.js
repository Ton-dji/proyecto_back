import authPacienteService from "../services/services.auth.paciente.js";

const registro = async (req, res) => {
  try {
    const resultado = await authPacienteService.registrarPaciente(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error in patient register:", error);
    if (error.message === "El paciente ya existe") {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).send("Error en servidor");
  }
};

const login = async (req, res) => {
  try {
    const resultado = await authPacienteService.loginPaciente(req.body);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    if (
      error.message === "Credenciales inválidas" ||
      error.message === "Contraseña inválida" ||
      error.message === "Este paciente no tiene contraseña configurada"
    ) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).send("Error en servidor");
  }
};

const activar = async (req, res) => {
  try {
    const resultado = await authPacienteService.activarCuentaPaciente(req.body);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    if (
      error.message === "Paciente no encontrado" ||
      error.message === "Esta cuenta ya está activada. Por favor inicia sesión."
    ) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).send("Error en servidor");
  }
};

export default {
  registro,
  login,
  activar,
};
