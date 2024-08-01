import { pool } from "../../db.js";

// ====== OBTENER CLASE ARTICULO ======
export const getClaseArticulo = async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `SELECT codcla, nomcla FROM clase_articulos ;`;
    const [results, fields] = await connection.query(sql);
    connection.release(); // Liberar la conexión
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las clases de los articulos.");
  }
};

// ELIMINAR ARTICULO
export const deleteClassArticle = async (req, res) => {
  const datosClassArticle = req.body;
  const connection = await pool.getConnection();
  const admin = "ADMINISTRADOR";
  try {
    if (admin != "ADMINISTRADOR") {
      res.json({ mensaje: "No tiene permisos de Administrador" });
    } else {
      const sql = `DELETE from clase_articulos WHERE codemp = ? and codcla= ?;`;
      const [results, fields] = await connection.query(sql, [
        datosClassArticle.cod_emp,
        datosClassArticle.cod_cla,
      ]);
      if (results.length != 0) {
        res.status(200).send("La clase del artículo eliminado");
      } else {
        res.status(500).send("La clase del artículo no puede ser eliminado");
      }
      connection.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};

// DESHABILITAR CLASE ARTICULO
export const deshabilitarClassArticle = async (req, res) => {
  const datosClassArticle = req.body;
  const estado = "0";
  const connection = await pool.getConnection();
  try {
    if (datosClassArticle.cargo_usu != "ADMINISTRADOR") {
      res.json({ mensaje: "No tiene permisos de Administrador" });
    } else {
      const sql = `UPDATE clase_articulos SET ESTADO = ? WHERE CODEMP = ? AND CODCLA = ?;`;
      const [results, fields] = await connection.query(sql, [
        estado,
        datosClassArticle.cod_emp,
        datosUsuario.cod_cla,
      ]);
      connection.release();
      res.json({ mensaje: "Artículo inactivo" });
      res.status(200).send(results);
    }
  } catch (error) {
    res.status(500).send("Error al deshabilitar la clase articulo.");
  }
};

//=========CREAR CLASE ARTICULO=========
export const createClassArticle = async (req, res) => {
  const fechaActual = new Date();
  const datosClassArticle = req.body;
  const connection = await pool.getConnection();
  try {
    if (!datosClassArticle.cod_cla || !datosClassArticle.nom_cla) {
      res.json({ mensaje: "Datos necesarios" });
    } else {
      const sql = `select codcla from clase_articulos where codemp=? and codcla=?;`;
      const [results, fields] = await connection.query(sql, [
        datosClassArticle.cod_emp,
        datosClassArticle.cod_cla,
      ]);
      if (results.length > 0) {
        const sql = `UPDATE clase_articulos SET codcla= ? ,nomcla= ? where codemp= ?  and codcla= ?;`;
        const [results, fields] = await connection.query(sql, [
          datosClassArticle.cod_cla,
          datosClassArticle.nom_cla,
          datosClassArticle.cod_emp,
          datosClassArticle.cod_cla,
        ]);
        res.status(200).json({ mensaje: "Clase artículo actualizado" });
      } else {
        const resultUsers = await pool.query(
          "INSERT INTO CLASE_ARTICULOS (codemp,codcla,nomcla,fecing,codusu) VALUES (?,?,?,?,?)",
          [
            datosClassArticle.cod_emp,
            datosClassArticle.cod_cla,
            datosClassArticle.nom_cla,
            fechaActual,
            datosClassArticle.cod_usu,
          ]
        );
        res
          .status(200)
          .json({ mensaje: "Clase del artículo creada correctamente." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la clase del artículo." });
  }
};
