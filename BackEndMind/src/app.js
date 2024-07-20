require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/userRoutes');
const financeRoutes = require('./routes/financeRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/finances', financeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
