import { Router } from "express";
import { createUsuario, deshabilitarUsuario, deleteUsuario, getUsuarios } from "../controllers/usuarios.js";

const api = Router();


api.post("/crear-usuario", createUsuario);
api.get("/estadousuario", deshabilitarUsuario);
api.get("/deteleusuario", deleteUsuario);
api.get("/usuarios", getUsuarios);


export default api;
