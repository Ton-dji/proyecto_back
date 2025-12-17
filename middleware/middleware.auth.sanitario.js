import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso denegado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.user) {
      req.sanitario = decoded.user; // Usuarios sanitarios
      req.role = "sanitario";
    } else if (decoded.paciente) {
      req.paciente = decoded.paciente; // Pacientes
      req.role = "paciente";
    } else {
      return res.status(401).json({ msg: "Token inválido" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no válido" });
  }
}
