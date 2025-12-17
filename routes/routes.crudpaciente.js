import Router from "express";
import auth from "../middleware/middleware.auth.sanitario.js"; // Importamos seguridad
import Paciente from "../controllers/controller.crudpaciente.js";

export const router = Router();
// 1. CREAR PACIENTE (POST /api/pacientes)
router.post("/", auth, Paciente.crear);

// 2. VER MIS PACIENTES (GET /api/pacientes)
router.get("/", auth, Paciente.listar);

// 3. ELIMINAR PACIENTE (DELETE /api/pacientes/:id)
router.delete("/:id", auth, Paciente.eliminar);
