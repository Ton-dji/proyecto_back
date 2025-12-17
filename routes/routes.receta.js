import Router from "express";
import auth from "../middleware/middleware.auth.sanitario.js"; // Importamos al guardia
import Receta from "../controllers/controller.receta.js";

export const router = Router();
// CREAR RECETA (Privado) - POST /api/recetas
router.post("/", auth, Receta.crear);

// VER MIS RECETAS (Privado) - GET /api/recetas
router.get("/", auth, Receta.listar);

// 3. ELIMINAR RECETA (Privado) - DELETE /api/recetas/:id
router.delete("/:id", auth, Receta.eliminar);
// module.exports = router;
