import { Router } from "express";
import { getResponsable } from "../controllers/responsable.js";

const api = Router();


api.get("/responsable", getResponsable);

export default api;