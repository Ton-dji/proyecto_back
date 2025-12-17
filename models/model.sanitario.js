import db from "../config/db.config.js";

const SanitarioSchema = new db.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["medico", "admin"],
    default: "medico",
  },
  availability: {
    days: {
      type: [String],
      default: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    },
    start: { type: String, default: "09:00" },
    end: { type: String, default: "17:00" },
  },
});

export default db.model("Sanitario", SanitarioSchema);
