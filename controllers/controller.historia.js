import historiaService from "../services/services.historia.js";

// Crear una nueva entrada en la historia clínica
const crear = async (req, res) => {
  try {
    const guardado = await historiaService.crearHistoria(
      req.body,
      req.sanitario.id
    );
    res.json(guardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar historia clínica");
  }
};

// Obtener la historia clínica de un paciente específico
const obtenerPorPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;
    const historial = await historiaService.obtenerHistoriaPorPaciente(
      pacienteId
    );
    res.json(historial);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener historia clínica");
  }
};

// Eliminar una entrada (opcional, solo el creador)
const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const entrada = await historiaService.eliminarHistoria(
      id,
      req.sanitario.id
    );

    if (!entrada) return res.status(404).send("Entrada no encontrada");
    if (entrada.medicoId.toString() !== req.sanitario.id) {
      return res.status(401).send("No autorizado");
    }

    res.json({ msg: "Entrada eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar");
  }
};

export default {
  crear,
  obtenerPorPaciente,
  eliminar,
};
