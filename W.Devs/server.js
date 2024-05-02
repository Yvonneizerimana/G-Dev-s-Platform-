import express from 'express';
const app= express();
import  database  from './database/connection.js';
import port from './PORT/express.js';
app.use(express.json());

//middlewares
database();
port(app);










