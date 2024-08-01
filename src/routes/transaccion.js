import { Router } from "express";
import { getTransaccion, createTransaccion } from "../controllers/transaccion.js";

const api = Router();


api.get("/transaccion", getTransaccion);
api.get("/creartransaccion", createTransaccion);

export default api;