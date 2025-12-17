import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConfig } from "./config/db.config.js";
import { router as authSanitarioRouter } from "./routes/routes.auth.sanitario.js";
import { router as recetasRouter } from "./routes/routes.receta.js";
import { router as pacientesRouter } from "./routes/routes.crudpaciente.js";
import { router as authPacienteRouter } from "./routes/routes.auth.paciente.js";
import { router as historiaRouter } from "./routes/routes.historia.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());

dbConfig();
// Serve uploaded files statically if needed, but we use download route for security
// app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authSanitarioRouter);
app.use("/api/auth/paciente", authPacienteRouter);
app.use("/api/recetas", recetasRouter);
app.use("/api/pacientes", pacientesRouter);
app.use("/api/historia", historiaRouter);

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
