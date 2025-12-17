import HistoriaClinica from "../models/model.historia.js";

/**
 * Crear nueva entrada de historia clínica
 * @param {Object} data - Datos de la entrada (pacienteId, tipo, motivoConsulta, etc.)
 * @param {String} medicoId - Id del médico que crea la entrada
 */
const crearHistoria = async (data, medicoId) => {
  const nuevaEntrada = new HistoriaClinica({
    ...data,
    medicoId,
  });

  const guardado = await nuevaEntrada.save();
  return guardado;
};

/**
 * Obtener historial por paciente
 * @param {String} pacienteId
 */
const obtenerHistoriaPorPaciente = async (pacienteId) => {
  return HistoriaClinica.find({ pacienteId })
    .sort({ fecha: -1 })
    .populate("medicoId", "nombre especialidad");
};

/**
 * Eliminar una entrada
 * @param {String} id
 * @param {String} medicoId
 */
const eliminarHistoria = async (id, medicoId) => {
  const entrada = await HistoriaClinica.findById(id);
  if (!entrada) throw new Error("Entrada no encontrada");
  if (entrada.medicoId.toString() !== medicoId)
    throw new Error("No autorizado");

  await entrada.deleteOne();
  return { msg: "Entrada eliminada" };
};

export default {
  crearHistoria,
  obtenerHistoriaPorPaciente,
  eliminarHistoria,
};
