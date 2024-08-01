import { Router } from "express";
import { createClassArticle, deleteClassArticle, deshabilitarClassArticle, getClaseArticulo } from "../controllers/claseArticulo.js";

const api = Router();


api.post("/crearclassarticle", createClassArticle);
api.get("/deleteclassarticle", deleteClassArticle);
api.get("/deshabilitarclassarticle", deshabilitarClassArticle);
api.get("/clasearticulos", getClaseArticulo);

export default api;