import { pool } from "../../db.js";

// ====== OBTENER TRANSACCION ======
export const getResponsable = async (req, res) => {
    try 
    {
        const connection = await pool.getConnection(); // Obtener una conexión
        const sql = `SELECT codres, nomres, dirres, telres, cargores FROM responsable where codemp='01' and estado='1' ;`;
        const [results, fields] = await connection.query(sql);
        connection.release(); // Liberar la conexión
        res.json(results);
    } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los responsables.");}
};