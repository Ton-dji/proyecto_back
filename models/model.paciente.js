import db from "../config/db.config.js";

const PacienteSchema = new db.Schema({
  medico: {
    type: db.Schema.Types.ObjectId, // Specialized type for MongoDB IDs
    ref: "sanitario", // Relates to the sanitario collection (Foreign Key equivalent)
  },
  nombre: { type: String, required: true },
  edad: { type: Number },
  telefono: { type: String },
  email: { type: String },
  password: { type: String },
  alergias: { type: String },
  antecedentes: { type: String },
  fechaRegistro: { type: Date, default: Date.now },
});

export default db.model("Paciente", PacienteSchema);
