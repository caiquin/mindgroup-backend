import express from 'express';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin:'http://localhost:8081'
  }));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

export default app;
