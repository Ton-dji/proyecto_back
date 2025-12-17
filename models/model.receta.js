// import mongoose from "mongoose";
import db from "../config/db.config.js";

const RecetaSchema = new db.Schema({
  medico: {
    type: db.Schema.Types.ObjectId,
    ref: "Sanitario",
    required: true,
  },
  pacienteNombre: { type: String, required: true },
  pacienteId: {
    type: db.Schema.Types.ObjectId,
    ref: "Paciente",
  },
  diagnostico: { type: String, required: true },
  medicamentos: [
    {
      nombre: String,
      dosis: String,
      frecuencia: String,
      duracion: String,
    },
  ],
  fecha: { type: Date, default: Date.now },
});

export default db.model("Receta", RecetaSchema);
