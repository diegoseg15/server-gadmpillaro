import express from "express";
import loginRoutes from "./src/routes/login.js";
import usuariosRoutes from "./src/routes/usuarios.js";
import claseArticuloRoutes from "./src/routes/claseArticulo.js";
import transaccionRoutes from "./src/routes/transaccion.js";
import articulosRoutes from "./src/routes/articulos.js";
import responsableRoutes from "./src/routes/responsable.js";
import unidadesRoutes from "./src/routes/unidades.js";
import indexRoutes from "./src/routes/index.js";
import localizacionRoutes from "./src/routes/localizacion.js";
import inventarioRoutes from "./src/routes/inventarios.js";

import { API_VERSION, PORT } from "./config.js";

import cors from "cors";

const app = express();

// Configurar análisis de JSON
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(express.json());

// Configurar encabezados HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Configurar rutas básicas
// const prefijoAPI = `/api/${API_VERSION}`;
app.use(`/api/${API_VERSION}`, indexRoutes);
app.use(`/api/${API_VERSION}`, loginRoutes);
app.use(`/api/${API_VERSION}`, usuariosRoutes);
app.use(`/api/${API_VERSION}`, claseArticuloRoutes);
app.use(`/api/${API_VERSION}`, unidadesRoutes);
app.use(`/api/${API_VERSION}`, articulosRoutes);
app.use(`/api/${API_VERSION}`, transaccionRoutes);
app.use(`/api/${API_VERSION}`, responsableRoutes);
app.use(`/api/${API_VERSION}`, localizacionRoutes);
app.use(`/api/${API_VERSION}`, inventarioRoutes);

// Configurar CORS
app.use(cors({ origin: "*" }));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
