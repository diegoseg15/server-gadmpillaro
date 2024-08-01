import { pool } from "../../db.js";
import { validateCedula, validarEmail } from "../../utils/funciones.js";


// ELIMINAR USUARIO
export const deleteUsuario = async (req, res) => {
  const datosUsuario = req.body
  const connection = await pool.getConnection();
  try 
  {
    if(datosUsuario.cargoUsu != "ADMINISTRADOR")
    {
      res.json({mensaje:"No tiene permisos de Administrador"});
    }else{
      const sql = `DELETE from usuarios WHERE codemp='01' AND codusu= ? AND cargousu= ?;`;
      const [results, fields] = await connection.query(sql, [datosUsuario.cod_usu, datosUsuario.cargo_usu]);
      if(results.length>0){
        connection.release();
        res.status(200).send("Usuario eliminado");
      }else{
      res.json({mensaje:"El usuario no puede ser eliminado"});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
};




// ====== OBTENER USUARIOS ======
export const getUsuarios = async (req, res) => {
  try {
    const connection = await pool.getConnection(); // Obtener una conexión
    const sql = `
        SELECT * FROM usuarios WHERE estado= '1';
      `;
    const [results, fields] = await connection.query(sql);
    connection.release(); // Liberar la conexión
    res.json(results); // Enviar los resultados como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los usuarios.");
  }
};


// DESHABILITAR USUARIO
export const deshabilitarUsuario = async (req, res) => {
  const datosUsuario = req.body
  const estado = "0";
  const connection = await pool.getConnection();
  try {
    if(datosUsuario.cargoUsu!="ADMINISTRADOR")
    {
      res.json({mensaje:"No tiene permisos de Administrador"});
    }else{
      const sql = `UPDATE usuarios SET ESTADO = ? WHERE CODEMP = ? AND CODUSU = ? AND CARGOUSU=?;`;
      const [results, fields] = await connection.query(sql, [estado, datosUsuario.cod_emp, datosUsuario.cod_usu, datosUsuario.cargo_usu]);
    connection.release();
    res.json(results);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el usuario.");
  }
};


//=========CREAR USUARIO=========
export const createUsuario = async (req, res) => {
  const fechaActual = new Date();
  const datosUsuario = req.body;
  const contadorId = datosUsuario.cod_usu.length;
  const connection = await pool.getConnection();
  const nombresCompletos = `${datosUsuario.nom_usu} ${datosUsuario.ape_usu}`;
  try {
    if (
      !datosUsuario.cod_usu ||
      !datosUsuario.passwo_usu ||
      !datosUsuario.nom_usu ||
      !datosUsuario.ape_usu ||
      !datosUsuario.pro_usu ||
      !datosUsuario.ciu_usu ||
      !datosUsuario.email_usu ||
      !datosUsuario.tel_usu
    ) {
      res.json({mensaje:"Datos necesarios"});
    }else if (!validateCedula(datosUsuario.cod_usu) || contadorId!=10) {
      res.json({mensaje:"Cédula incorrecta"});
    }else if (!validarEmail(datosUsuario.email_usu)) {
      res.json({mensaje:"Correo electronico invalido"});
    } else if (datosUsuario.cargo_usu != "ADMINISTRADOR") {
      res.json({mensaje:"No tienes derechos de administrador"});
    } else {
      const sql = `
        select codusu from usuarios where codemp=? and codusu=?;
        `;
        const [results, fields] = await connection.query(sql, [datosUsuario.cod_emp, datosUsuario.cod_usu]);
        if(results.length>0)
        {
          const sql = `
          UPDATE usuarios SET PASSWOUSU= ? ,NOMUSU= ? ,APEUSU= ?, NOMAPEUSU=? ,CIUUSU= ? ,PROUSU= ? ,DIRUSU= ? ,TELUSU= ? ,EMAILUSU= ? ,CARGOUSU= ?  where codemp= ?  and CODUSU= ?;
          `;
          const [results, fields] = await connection.query(sql, [datosUsuario.passwo_usu, datosUsuario.nom_usu, datosUsuario.ape_usu, nombresCompletos, datosUsuario.ciu_usu, datosUsuario.pro_usu,datosUsuario.dir_usu, datosUsuario.tel_usu, datosUsuario.email_usu, datosUsuario.cargo_usu, datosUsuario.cod_emp, datosUsuario.cod_usu]);
          res.status(200).send("Usuario Actualizado");
        }else
        {
          const resultUsers = await pool.query(
                "INSERT INTO usuarios (codemp,codusu,passwousu,nomusu,apeusu,nomapeusu,sexusu,ciuusu,prousu,dirusu,telusu,celusu,emailusu,cargousu,estado,fecing) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                  datosUsuario.cod_emp,
                  datosUsuario.cod_usu,
                  datosUsuario.passwo_usu,
                  datosUsuario.nom_usu,
                  datosUsuario.ape_usu,
                  nombresCompletos,
                  datosUsuario.sex_usu,
                  datosUsuario.ciu_usu,
                  datosUsuario.pro_usu,
                  datosUsuario.dir_usu,
                  datosUsuario.tel_usu,
                  datosUsuario.cel_usu,
                  datosUsuario.email_usu,
                  datosUsuario.cargo_usu,
                  datosUsuario.estado,
                  fechaActual,
                ]
              );
              res.status(200).send({mensaje:"Usuario insertado correctamente."});
        }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al insertar el Usuario.");
  }
};







