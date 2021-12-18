import { connect } from "../database";

//obtener las tareas por GET
export const getTasks = async (req,res) =>{
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM tasks WHERE userid = ?',[req.params.id]);
    res.json(rows);
}
//obtener una unica tarea por GET
export const getTask = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?',[req.params.id]);
    res.json(rows[0]);
}
export const getTaskCount = async (req,res) =>{
    const connection = await connect();
    const[rows] = await connection.query('SELECT COUNT(*) FROM tasks');
    console.log(rows);
    res.json(rows[0]["COUNT(*)"]);
}
export const saveTasks = async (req,res) =>{
    console.log(req);
    const connection = await connect();
    const [results] = await connection.query('INSERT INTO tasks (title, description, userid) VALUES (?,?,?)',[
        req.body.title,
        req.body.description,
        req.body.userid
    ]);
    console.log(results);
    res.json({
        id:results.insertId,
        ...req.body,
    })
}
export const deleteTasks = async (req,res) =>{
    const connection = await connect();
    const [rows] = await connection.query('DELETE FROM tasks WHERE id = ?',[req.params.id]);
    console.log(rows);
    res.sendStatus(204);
}
export const updateTasks = async (req,res) =>{
    const connection = await connect();
    await connection.query('UPDATE tasks SET ? WHERE id = ?',[
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}



