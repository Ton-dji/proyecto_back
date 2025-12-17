import { Router } from "express";
import AuthPaciente from "../controllers/controller.auth.paciente.js";

export const router = Router();

// POST /api/auth/paciente/registro
router.post("/registro", AuthPaciente.registro);

// POST /api/auth/paciente/login
router.post("/login", AuthPaciente.login);

// POST /api/auth/paciente/activar
router.post("/activar", AuthPaciente.activar);
