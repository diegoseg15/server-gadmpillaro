import { Router } from "express";
import { getUnidadesMedida, deleteUnidades, createUnidades } from "../controllers/unidades.js";

const api = Router();


api.get("/unidades", getUnidadesMedida);
api.get("/deleteunidades", deleteUnidades);
api.get("/createunidades", createUnidades);


export default api;

