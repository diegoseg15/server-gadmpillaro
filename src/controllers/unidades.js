import { pool } from "../../db.js";


// ====== OBTENER UNIDADES DE MEDIDAS ======
export const getUnidadesMedida = async (req, res) => {
    try 
    {
        const connection = await pool.getConnection(); // Obtener una conexión
        const sql = `SELECT coduni, nomuni FROM unidades ;`;
        const [results, fields] = await connection.query(sql);
        connection.release(); // Liberar la conexión
        res.json(results);
    } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las unidades de medida.");}
};


export const deleteUnidades = async (req, res) => {
    const unidades = req.body
    const connection = await pool.getConnection();
    try 
    {
        if(unidades.cargo_usu!= "ADMINISTRADOR")
        {
            res.json({mensaje:"No tiene permisos de Administrador"});
        }else{
            const sql = `DELETE from unidades WHERE codemp = ? and coduni= ?;`;
            const [results, fields] = await connection.query(sql, [unidades.cod_emp, unidades.cod_uni]);
            if(results.length!=0){
                res.status(200).send("La unidad de medida ha sido eliminado");
            }else{
                res.status(500).send("La unidad de medida no puede ser eliminado")
        }
        connection.release();
        }
    } catch (error) {
    console.error(error);
    res.status(500).send("Error");
    }
};


//=========CREAR UNIDADES=========
export const createUnidades = async (req, res) => {
    const fechaActual = new Date();
    const unidades = req.body;
    const connection = await pool.getConnection();
    try 
    {
        if (!unidades.cod_uni || 
            !unidades.nom_uni) {
            res.json({mensaje:"Datos necesarios"});
            }else if(unidades.cargo_usu!="ADMINISTRADOR"){
                res.json({mensaje: "No tiene permisos de administrador"});
            }else{
                const sql = `select coduni from unidades where codemp=? and coduni=?;`;
                const [results, fields] = await connection.query(sql, [unidades.cod_emp, unidades.cod_uni]);
                if(results.length>0)
                {
                    const sql = `UPDATE unidades SET coduni= ? ,nomuni= ? where codemp= ?  and coduni= ?;`;
                    const [results, fields] = await connection.query(sql, [unidades.cod_uni, unidades.nom_uni, unidades.cod_emp, unidades.cod_uni]);
                    res.status(200).send("Unidad de medida actualizado");
                }else{
                    const resultUsers = await pool.query(
                        "INSERT INTO unidades (codemp,coduni,nomuni,fecing,codusu) VALUES (?,?,?,?,?)",
                        [
                            unidades.cod_emp,
                            unidades.cod_uni,
                            unidades.nom_uni,
                            fechaActual,
                            unidades.cod_usu
                        ]
                        );
                    res.status(200).send("Unidad de medida creada correctamente.");
                }
            }
            
    } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la unidad de medida.");
    }
};