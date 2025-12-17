// import mongoose from "mongoose";
import db from "../config/db.config.js";

const HistoriaClinicaSchema = new db.Schema({
  pacienteId: {
    type: db.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
  medicoId: {
    type: db.Schema.Types.ObjectId,
    ref: "Sanitario",
    required: true,
  },
  fecha: { type: Date, default: Date.now },
  tipo: {
    type: String,
    enum: ["Consulta", "Urgencia", "Control"],
    default: "Consulta",
  },
  motivoConsulta: { type: String, required: true },
  sintomas: { type: String },
  diagnostico: { type: String },
  tratamiento: { type: String }, // Notas de texto libre sobre el tratamiento
  notas: { type: String }, // Observaciones privadas del médico
});

export default db.model("HistoriaClinica", HistoriaClinicaSchema);
