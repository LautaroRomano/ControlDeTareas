import {config as dotenv} from 'dotenv';

//funcion para usar variables de entorno
dotenv();

export const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'tasksdb',
}