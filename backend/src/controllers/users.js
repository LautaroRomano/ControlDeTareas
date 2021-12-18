import { connect } from "../database";

//obtener los usuarios por GET
export const getUsers = async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM users');
    res.json(rows);
}
export const saveUser = async (req,res) =>{
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO users (user, password, email) VALUES (?,?,?)',[
        req.body.user,
        req.body.password,
        req.body.email
    ]);
    console.log(results);
    res.json({
        id:results.insertId,
        ...req.body,
    })
}
