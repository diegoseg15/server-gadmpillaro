import { Router } from "express";
import { createAdultoMayor, getAdultoMayor } from "../controllers/adultoMayor.js";

const api = Router();

api.get("/get-AdultoMayor/:id", getAdultoMayor);
api.get("/crear-adultomayor", createAdultoMayor);

export default api;
