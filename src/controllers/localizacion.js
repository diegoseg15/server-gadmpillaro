import { pool } from "../../db.js";

// ELIMINAR USUARIO
export const getProvincias = async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `
          SELECT * FROM tbl_provincia;
        `;
    const [results, fields] = await connection.query(sql); // Ejecutar la consulta
    connection.release(); // Liberar la conexión
    res.json(results); // Enviar los resultados como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios.");
  }
};

export const getCiudades = async (req, res) => {
  const idProvincia = req.params.idProvincia;
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `
            SELECT * FROM tbl_canton WHERE id_provincia = ?;
          `;
    const [results, fields] = await connection.query(sql, [idProvincia]); // Ejecutar la consulta
    connection.release(); // Liberar la conexión
    res.json(results); // Enviar los resultados como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios.");
  }
};
