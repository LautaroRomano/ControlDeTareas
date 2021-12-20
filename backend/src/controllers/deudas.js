import { connect } from "../database";

//obtener los usuarios por GET
export const getDeudas = async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM deudas  WHERE userid = ?',[req.params.id]);
    res.json(rows);
}

export const saveDeuda = async (req,res) =>{
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO deudas (title, precio, userid, fecpago, fecinicio, cantmeses) VALUES (?,?,?,?,?,?)',[
        req.body.title,
        req.body.precio,
        req.body.userid,
        req.body.fecpago,
        req.body.fecinicio,
        req.body.cantmeses
    ]);
    console.log(results);
    res.json({
        id:results.insertId,
        ...req.body,
    })
}

export const getDeuda = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM deudas WHERE id = ?',[req.params.id]);
    res.json(rows[0]);
}

export const deleteDeuda = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('DELETE FROM deudas WHERE id = ?',[req.params.id]);
    console.log(rows);
    res.sendStatus(204);
}

export const updateDeuda = async (req,res) =>{
    const connection = await connect();
    await connection.query('UPDATE deudas SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}
 