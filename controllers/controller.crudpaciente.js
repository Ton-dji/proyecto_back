import pacienteService from "../services/services.crudpaciente.js";

const crear = async (req, res) => {
  try {
    const pacienteGuardado = await pacienteService.crearPaciente(
      req.body,
      req.sanitario.id
    );
    res.json(pacienteGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar paciente");
  }
};

const listar = async (req, res) => {
  try {
    const pacientes = await pacienteService.obtenerPacientesPorMedico(
      req.sanitario.id
    );
    res.json(pacientes);
  } catch (error) {
    res.status(500).send("Error al obtener pacientes");
  }
};

const eliminar = async (req, res) => {
  try {
    await pacienteService.eliminarPaciente(req.params.id, req.sanitario.id);
    res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    if (error.message === "Paciente no encontrado")
      return res.status(404).json({ msg: error.message });
    if (error.message === "No autorizado")
      return res.status(401).json({ msg: error.message });

    res.status(500).send("Error al eliminar");
  }
};

export default {
  crear,
  listar,
  eliminar,
};
