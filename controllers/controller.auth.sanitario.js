import authSanitarioService from "../services/services.auth.sanitario.js";

const registro = async (req, res) => {
  try {
    const resultado = await authSanitarioService.registrarSanitario(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error in register:", error);
    if (error.message === "El usuario ya existe") {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).send("Error en servidor");
  }
};

const login = async (req, res) => {
  console.log("Intento de login:", req.body);
  try {
    const resultado = await authSanitarioService.loginSanitario(req.body);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    if (
      error.message === "Credenciales inválidas" ||
      error.message === "Contraseña inválida"
    ) {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).send("Error en servidor");
  }
};

export default {
  registro,
  login,
};
