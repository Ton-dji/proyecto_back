import Router from "express";
import AuthSanitario from "../controllers/controller.auth.sanitario.js";

export const router = Router();

router.post("/", (req, res) => {
  res.send("Login");
});

// REGISTRO(POST / api / auth / registro);
router.post("/registro", AuthSanitario.registro);

// LOGIN (POST /api/auth/login)
router.post("/login", AuthSanitario.login);

// module.exports = router;
