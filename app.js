import express from 'express'
//import books from './db.js'
import {DayMiddleware} from './middlewares/currentDate.middlewares.js';
import {msgGet} from './middlewares/DateGet.middlewares.js';
import {error} from './middlewares/error.middlewares.js';
import cors from 'cors';
import morgan from 'morgan';
const app=express()
//fetch('http://localhost:3000/book')
app.use(morgan('dev'));
app.use(cors({origin:'http://localhost:8080'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(DayMiddleware);
app.use(msgGet);
app.use(error);
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})