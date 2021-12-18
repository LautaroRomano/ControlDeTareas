import express from 'express';
import tasksRoutes from './routes/tasks';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json());

app.use(tasksRoutes);

export default app 