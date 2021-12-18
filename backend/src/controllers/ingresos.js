import { connect } from "../database";

//obtener los usuarios por GET
export const getIngresos = async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM ingresos WHERE userid = ?',[req.params.id]);
    res.json(rows);
}

export const getIngresosCount = async (req,res) =>{
    const connection = await connect();
    const[rows] = await connection.query('SELECT SUM(precio) FROM ingresos WHERE userid = ?',[req.params.id]);
    console.log(rows);
    res.json(rows[0]["SUM(precio)"]);
}

export const saveIngreso = async (req,res) =>{
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO ingresos (title, precio, userid) VALUES (?,?,?)',[
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

export const getIngreso = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM ingresos WHERE id = ?',[req.params.id]);
    res.json(rows[0]);
}

export const deleteIngreso = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('DELETE FROM ingresos WHERE id = ?',[req.params.id]);
    console.log(rows);
    res.sendStatus(204);
}

export const updateIngreso = async (req,res) =>{
    const connection = await connect();
    await connection.query('UPDATE ingresos SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}
  