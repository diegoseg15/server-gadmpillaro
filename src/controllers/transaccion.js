import { pool } from "../../db.js";

// ====== OBTENER TRANSACCION ======
export const getTransaccion = async (req, res) => {
    try 
    {
        const connection = await pool.getConnection(); // Obtener una conexión
        const sql = `SELECT codtip, nomtip, signo FROM tipo_transaccion ;`;
        const [results, fields] = await connection.query(sql);
        connection.release(); // Liberar la conexión
        res.json(results);
    } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los tipos de transacción.");}
};


//=========CREAR TRANSACCIÓN=========
export const createTransaccion = async (req, res) => {
    const fechaActual = new Date();
    const transaccion = req.body;
    const connection = await pool.getConnection();
    try 
    {
        if (!transaccion.cod_tip || 
            !transaccion.nom_tip ||
            !transaccion.signo) {
            res.json({mensaje:"Datos necesarios"});
            }else if(transaccion.cargo_usu!="ADMINISTRADOR"){
                res.json({mensaje:"No tiene permisos de Administrador"});
            }else
            {
                const sql = `select codtip from tipo_transaccion where codemp=? and codtip=?;`;
                const [results, fields] = await connection.query(sql, [transaccion.cod_emp, transaccion.cod_tip]);
                if(results.length>0)
                {
                    const sql = `UPDATE tipo_transaccion SET nomtip= ? ,signo= ? where codemp= ?  and codtip= ?;`;
                    const [results, fields] = await connection.query(sql, [transaccion.nom_tip, transaccion.signo, transaccion.cod_emp, transaccion.cod_tip]);
                    res.status(200).send("Tipo transacción actualizado");
                }else{
                    const resultUsers = await pool.query(
                        "INSERT INTO tipo_transaccion (codemp,codtip,nomtip,signo,fecing,codusu) VALUES (?,?,?,?,?,?)",
                        [
                            transaccion.cod_emp,
                            transaccion.cod_tip,
                            transaccion.nom_tip,
                            transaccion.signo,
                            fechaActual,
                            transaccion.cod_usu
                        ]
                        );
                    res.status(200).send("Tipo de transacción insertada correctamente");
                }
            }
    } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la tipo de transacción.");
    }
};