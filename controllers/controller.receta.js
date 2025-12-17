import recetaService from "../services/services.receta.js";

const crear = async (req, res) => {
  try {
    // El controlador extrae lo necesario de la request
    const recetaGuardada = await recetaService.crearReceta(
      req.body,
      req.sanitario.id
    );
    res.status(201).json(recetaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al guardar la receta" });
  }
};

const listar = async (req, res) => {
  try {
    const recetas = await recetaService.obtenerRecetasPorMedico(
      req.sanitario.id
    );
    res.json(recetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener recetas" });
  }
};

const eliminar = async (req, res) => {
  try {
    await recetaService.eliminarReceta(req.params.id, req.sanitario.id);
    res.json({ msg: "Receta eliminada correctamente" });
  } catch (error) {
    // Manejo de errores específicos del servicio
    if (error.message === "Receta no encontrada")
      return res.status(404).json({ msg: error.message });
    if (error.message === "No autorizado")
      return res.status(401).json({ msg: error.message });

    res.status(500).send("Error del servidor");
  }
};

export default {
  crear,
  listar,
  eliminar,
};
