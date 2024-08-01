import { pool } from "../../db.js";

export const validarLogin = async (req, res) => {
    const usuarioLogin = req.body;
    try {
        const connection = await pool.getConnection();
        if(!usuarioLogin.cod_usu || !usuarioLogin.passwo_usu)
        {
            res.json({mensaje:"Llene los campos, se encuentran vacíos"});
        }else if(!usuarioLogin.cod_usu){
            res.json({mensaje: "Ingrese su Usuario"});
        }else if(!usuarioLogin.passwo_usu){
            res.json({mensaje:"Ingrese su contraseña"});
        }else{
            const sql = `select codusu from usuarios where codemp='01' and codusu=?`;
            const [results, fields] = await connection.query(sql, [usuarioLogin.cod_usu]); // Ejecutar la consulta
            if(results.length>0){
                const sql = `select codusu from usuarios where codemp='01' and codusu=? and passwousu=?`;
                const [results, fields] = await connection.query(sql, [usuarioLogin.cod_usu, usuarioLogin.passwo_usu]);
                if(results.length>0)
                {
                    const sql = `select codusu, cargousu, codemp, nomapeusu from usuarios where codemp='01' and codusu=? and passwousu=? and estado='1'`;
                    const [results, fields] = await connection.query(sql, [usuarioLogin.cod_usu, usuarioLogin.passwo_usu]);
                    if(results.length>0){
                        res.status(200).send(results);
                    }
                    else{
                        res.json({mensaje:"Usuario Inactivo"});
                    }
                }else{
                    res.json({mensaje:"Contraseña incorrecta"});
                }
                
            }else{
                res.json({mensaje:"No existe el usuario"});
            }
        }
    } catch (error) {
        res.status(500).json({mensaje:"Error al obtener los usuarios."});
    }
};