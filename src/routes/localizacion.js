import { Router } from "express";
import { getCiudades, getProvincias } from "../controllers/localizacion.js";

const api = Router();


api.get("/provincias", getProvincias);
api.get("/ciudades/:idProvincia", getCiudades)

export default api;