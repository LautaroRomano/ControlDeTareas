import { Router } from 'express';
import { deleteTasks, getTaskCount, getTasks, getTask, saveTasks, updateTasks } from '../controllers/task';
import {getUsers,saveUser} from '../controllers/users'
import {getIngresos,getIngresosCount, getIngreso, deleteIngreso, saveIngreso, updateIngreso} from '../controllers/ingresos'
import {getGastos,getGastosCount, getGasto, deleteGasto, saveGasto, updateGasto} from '../controllers/gastos'


const router = Router();
//seccion tasks
router.get('/tasks/user/:id', getTasks)

router.get('/tasks/count', getTaskCount)

router.get('/tasks/:id', getTask)

router.post('/tasks', saveTasks)

router.delete('/tasks/:id', deleteTasks)

router.put('/tasks/:id', updateTasks)

//seccion users
router.get('/users', getUsers)

router.post('/users', saveUser)

//seccion ingresos
router.get('/ingresos/user/:id', getIngresos)

router.get('/ingresos/user/:id/count', getIngresosCount)

router.get('/ingresos/:id', getIngreso)

router.post('/ingresos', saveIngreso)

router.delete('/ingresos/:id', deleteIngreso)

router.put('/ingresos/:id', updateIngreso)

//seccion gastos
router.get('/gastos/user/:id/count', getGastosCount)

router.get('/gastos/user/:id', getGastos)

router.get('/gastos/:id', getGasto)

router.post('/gastos', saveGasto)

router.delete('/gastos/:id', deleteGasto)

router.put('/gastos/:id', updateGasto)

export default router