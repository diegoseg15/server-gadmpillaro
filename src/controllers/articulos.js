import { pool } from "../../db.js";

// ====== OBTENER ARTICULO ======
export const getArticulo = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `SELECT codart, nomart, coduni, codcla, precio, ultcos, cantidad, existencia, stkmax, stkmin, codinv, caducidad, fecing FROM articulos where estado='1' AND codinv = ?;`;
    const [results, fields] = await connection.query(sql, [id]);
    connection.release(); // Liberar la conexión
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los articulos.");
  }
};

export const getTodosArticulo = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `SELECT codart, nomart, coduni, codcla, precio, ultcos, cantidad, existencia, stkmax, stkmin, codinv, caducidad, fecing FROM articulos where estado='1';`;
    const [results, fields] = await connection.query(sql);
    connection.release(); // Liberar la conexión
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los articulos.");
  }
};

//=========CREAR ARTICULO=========
export const createArticulo = async (req, res) => {
  const fechaActual = new Date();
  const datosArticle = req.body;
  const estado = "1";
  const connection = await pool.getConnection();
  try {
    if (
      !datosArticle.cod_art ||
      !datosArticle.nom_art ||
      !datosArticle.cod_uni ||
      !datosArticle.precio ||
      !datosArticle.ultcos ||
      !datosArticle.existencia ||
      !datosArticle.cantidad ||
      !datosArticle.stkmax ||
      !datosArticle.stkmin ||
      !datosArticle.cod_cla
    ) {
      res.json({ mensaje: "Datos necesarios" });
    } else if (datosArticle.cargo_usu !== "ADMINISTRADOR") {
      res.json({ mensaje: "No tiene permisos de Administrador" });
    } else if (!datosArticle.cod_inv) {
      res.json({ mensaje: "No se encontró el inventario" });
    } else {
      const sql = `select codart from articulos where codemp=? and codart=?;`;
      const [results, fields] = await connection.query(sql, [
        datosArticle.cod_emp,
        datosArticle.cod_art,
      ]);
      if (results.length > 0) {
        const sql = `UPDATE articulos SET codart = ?, nomart = ?, coduni = ?, existencia = ?, precio = ?, ultcos = ?, stkmax = ?, stkmin = ?, observaciones = ?, codcla = ?, caducidad = ? where codemp = ?  and codart = ?;`;
        const [results, fields] = await connection.query(sql, [
          datosArticle.cod_art,
          datosArticle.nom_art,
          datosArticle.cod_uni,
          datosArticle.existencia,
          datosArticle.precio,
          datosArticle.ultcos,
          datosArticle.stkmax,
          datosArticle.stkmin,
          datosArticle.observaciones,
          datosArticle.cod_cla,
          datosArticle.caducidad,
          datosArticle.cod_emp,
          datosArticle.cod_art,
        ]);
        res.status(200).json({ mensaje: "Artículo actualizado" });
      } else {
        const resultUsers = await pool.query(
          "INSERT INTO articulos (codemp,codart,nomart,coduni,precio, ultcos, cantidad, existencia, stkmax, stkmin, observaciones, codcla, fecing, codusu, estado, codinv, caducidad ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            datosArticle.cod_emp,
            datosArticle.cod_art,
            datosArticle.nom_art,
            datosArticle.cod_uni,
            datosArticle.precio,
            datosArticle.ultcos,
            datosArticle.cantidad,
            datosArticle.existencia,
            datosArticle.stkmax,
            datosArticle.stkmin,
            datosArticle.observaciones,
            datosArticle.cod_cla,
            fechaActual,
            datosArticle.cargo_usu,
            estado,
            datosArticle.cod_inv,
            datosArticle.caducidad,
          ]
        );
        res.status(200).json({ mensaje: "Artículo creado correctamente." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el artículo." });
  }
};
