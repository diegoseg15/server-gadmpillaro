import { Router } from "express";
import { validarLogin } from '../controllers/login.js'


const api = Router();


api.post("/login", validarLogin);


export default api;