// Rotas HTTP do módulo Clientes. Fina de propósito — só traduz request/response,
// toda regra de negócio fica no service.
import { Router } from "express";
import * as service from "./clientes.service.js";

export const clientesRouter = Router();

clientesRouter.get("/", async (req, res) => {
  try {
    const clientes = await service.listarClientes({ busca: req.query.busca });
    res.json(clientes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

clientesRouter.get("/:id", async (req, res) => {
  try {
    const cliente = await service.buscarClientePorId(req.params.id);
    res.json(cliente);
  } catch (erro) {
    res.status(404).json({ erro: erro.message });
  }
});

clientesRouter.post("/", async (req, res) => {
  try {
    const cliente = await service.criarCliente(req.body);
    res.status(201).json(cliente);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

clientesRouter.put("/:id", async (req, res) => {
  try {
    const cliente = await service.editarCliente(req.params.id, req.body);
    res.json(cliente);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

clientesRouter.delete("/:id", async (req, res) => {
  try {
    await service.removerCliente(req.params.id);
    res.status(204).send();
  } catch (erro) {
    res.status(404).json({ erro: erro.message });
  }
});
