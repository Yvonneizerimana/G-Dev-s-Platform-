import express from 'express';
const app= express();
import  database  from './database/connection.js';
import port from './PORT/express.js';

//middlewares

app.use(express.json());
database();
port(app);






