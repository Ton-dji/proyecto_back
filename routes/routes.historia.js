import Router from "express";
import auth from "../middleware/middleware.auth.sanitario.js";
import HistoriaController from "../controllers/controller.historia.js";

export const router = Router();

// GET /api/historia/:pacienteId - Obtener historial de un paciente
router.get("/:pacienteId", auth, HistoriaController.obtenerPorPaciente);

// POST /api/historia - Crear nueva entrada
router.post("/", auth, HistoriaController.crear);

// DELETE /api/historia/:id - Eliminar entrada
router.delete("/:id", auth, HistoriaController.eliminar);
