// server/index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { dataBaseConnection } from './dataBase.js';
import { userRouter } from './route/user.js';
import { ForgetPassRouter } from './route/forgotEmails.js';

const app = express();
const PORT = process.env.PORT;

// Database Connection
dataBaseConnection();

// Middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// Routes
app.use('/user', userRouter);
app.use('/missed', ForgetPassRouter);

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
