import { Router } from "express";
import {
  createArticulo,
  getArticulo,
  getTodosArticulo,
} from "../controllers/articulos.js";

const api = Router();

api.post("/creararticulo", createArticulo);
api.get("/articulo/:id", getArticulo);
api.get("/todosarticulos/", getTodosArticulo);
export default api;
