import Paciente from "../models/model.paciente.js";

// Create: Combined patient data + ID of doctor creating them
const crearPaciente = async (datosPaciente, idMedico) => {
  const nuevoPaciente = new Paciente({
    ...datosPaciente, // Spread operator copies all fields(nombre, edad, etc)
    medico: idMedico, // Link patient to the logged-in doctor
  });
  return await nuevoPaciente.save(); // Save to DB
};

// Read: Get only patients belonging to this doctor
const obtenerPacientesPorMedico = async (idMedico) => {
  return await Paciente.find({ medico: idMedico }).sort({
    fechaRegistro: -1, // Sort newest first
  });
};

// Delete: Extra security check
const eliminarPaciente = async (idPaciente, idMedico) => {
  const paciente = await Paciente.findById(idPaciente);
  if (!paciente) throw new Error("Paciente no encontrado");

  // Security: Ensure the doctor deleting is the one who owns the patient
  if (paciente.medico.toString() !== idMedico) {
    throw new Error("No autorizado");
  }

  return await paciente.deleteOne();
};

export default { crearPaciente, obtenerPacientesPorMedico, eliminarPaciente };
