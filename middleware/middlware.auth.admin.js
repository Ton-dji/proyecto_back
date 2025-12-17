import Sanitario from "../models/model.sanitario.js";

export default async function (req, res, next) {
  try {
    // req.usuario.id comes from auth middleware
    const user = await Sanitario.findById(req.sanitario.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        msg: "Acceso denegado. Requiere privilegios de Administrador.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en validación de admin");
  }
}
