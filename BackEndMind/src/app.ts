import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes';
import financeRoutes from './routes/financeRoutes';
import dotenv from 'dotenv';
const cors = require('cors');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/finances', financeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
