import { pool } from "../../db.js";

export const getInventarios = async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `SELECT codinv, nominv FROM inventario;`;
    const [results, fields] = await connection.query(sql);
    connection.release(); // Liberar la conexión
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los inventarios.");
  }
};
