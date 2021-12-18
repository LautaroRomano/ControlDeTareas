import { connect } from "../database";

//obtener los usuarios por GET
export const getGastos = async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM gastos  WHERE userid = ?',[req.params.id]);
    res.json(rows);
}

export const getGastosCount = async (req,res) =>{
    const connection = await connect();
    const[rows] = await connection.query('SELECT SUM(precio) FROM gastos WHERE userid = ?',[req.params.id]);
    console.log(rows);
    res.json(rows[0]["SUM(precio)"]);
}

export const saveGasto = async (req,res) =>{
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO gastos (title, precio, userid) VALUES (?,?,?)',[
        req.body.title,
        req.body.precio,
        req.body.userid
    ]);
    console.log(results);
    res.json({
        id:results.insertId,
        ...req.body,
    })
}

export const getGasto = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM gastos WHERE id = ?',[req.params.id]);
    res.json(rows[0]);
}

export const deleteGasto = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('DELETE FROM gastos WHERE id = ?',[req.params.id]);
    console.log(rows);
    res.sendStatus(204);
}

export const updateGasto = async (req,res) =>{
    const connection = await connect();
    await connection.query('UPDATE gastos SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}
 