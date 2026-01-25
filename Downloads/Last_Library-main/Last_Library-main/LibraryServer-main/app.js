import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { currentDayMiiddle } from "./middleWares/date.middleWares.js"
import { methodGet } from "./middleWares/dateGet.middleWares.js"
import { error } from "./middleWares/error.middleWares.js"
import { connectDB } from './config/db.js';
import bookRouter from './routes/books.route.js';
import userRouter from './routes/users.route.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
connectDB();
app.use(morgan('dev'));
app.use(cors({ origin: 'http://127.0.0.1:8080' }));
app.use(express.json());
//app.use(express.urlenidd({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(currentDayMiiddle);
app.use(methodGet);
app.use('/books', bookRouter);
app.use('/users', userRouter);

app.use(error)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})