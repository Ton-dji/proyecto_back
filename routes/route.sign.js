import express from "express";
import { loginController } from "../controllers/controller.sign.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  res.send(await loginController(email, password));
});

router.get("/register", (req, res) => {
  res.send("Hello World!");
});

export default router;
