import { Router } from "express";
import { getInventarios } from "../controllers/inventarios.js";

const api = Router();

api.get("/inventarios", getInventarios);

export default api;
