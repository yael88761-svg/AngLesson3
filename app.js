import express from 'express'
import books from './db.js'

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})