import "dotenv/config";
import express from "express";
import { clientesRouter } from "./modules/clientes/clientes.routes.js";

const app = express();
app.use(express.json());

app.use("/clientes", clientesRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", servico: "sistema-rotas" });
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
