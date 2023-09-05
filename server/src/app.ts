import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import api from './api/index.js';


const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
  res.json({
    massage:"hello"
  })
});

app.use('/api', api);


export default app;

