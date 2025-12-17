import Receta from "../models/model.receta.js";

const crearReceta = async (datosReceta, idMedico) => {
  const nuevaReceta = new Receta({
    ...datosReceta,
    medico: idMedico,
  });

  return await nuevaReceta.save();
};

const obtenerRecetasPorMedico = async (idMedico) => {
  return await Receta.find({ medico: idMedico }).sort({ fecha: -1 });
};

const eliminarReceta = async (idReceta, idMedico) => {
  const receta = await Receta.findById(idReceta);
  if (!receta) throw new Error("Receta no encontrada");

  if (receta.medico.toString() !== idMedico) {
    throw new Error("No autorizado");
  }

  return await receta.deleteOne();
};

export default {
  crearReceta,
  obtenerRecetasPorMedico,
  eliminarReceta,
};
