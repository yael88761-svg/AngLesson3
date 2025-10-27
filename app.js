import express from 'express'
import books from './db.js'

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("hello")
})
app.get('/books', (req, res) => {
    const search = (req.query.search || "");
    const limitValue = +req.query.limit || 5;
    const skipValue = +req.query.skip || 0;

    let result = books;

    if (search) {
        result = result.filter(x => x.name.includes(search));
    }
    result = result.slice(skipValue, skipValue + limitValue);

    res.json(result);
});

app.get('/books/:id',(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    const book=books.find(x=>x.code===+req.params.id)
    res.json(book)
})
app.post('/books',(req,res)=>{
    console.log(req.body);
    books.push(req.body)
    res.send(req.body)   
})

app.put('/books/:id',(req,res)=>{
    const id=+req.params.id

    const bookIndex = books.findIndex(x => x.code === id)
if (bookIndex !== -1) {
  books[bookIndex] = { ...books[bookIndex], ...req.body } // מעדכן רק שדות נשלחים
}
    res.json({index:bookIndex,message:"book updated",books})
    
    
})

app.put('/books/:code/:name',(req,res)=>{
    const bookId=+req.params.code
    const name=req.params.name
    const bookIndex = books.findIndex(x => x.code === bookId)
    if (bookIndex !== -1) {
        if(books[bookIndex].isBorrowed===false)
        {
            books[bookIndex].isBorrowed=true
            books[bookIndex].lends.push({"date":new Date().toString(),"customerId":name})
            res.json({index:bookIndex,message:"lend added",books})
        }
    }
})

app.put('books/:id',(req,res)=>{
    const bookId=+req.params.code
    const bookIndex = books.findIndex(x => x.code === bookId)
    if (bookIndex !== -1) 
    {
        books[bookIndex].isBorrowed=false
    }
})

app.delete('/books/:id',(req,res)=>{
    const bookIndex = books.findIndex(x => x.code === +req.params.id)
    if(bookIndex!==-1)
    {
        books.splice(bookIndex,1)
        res.json({message:"deleted",books})
    }
})
const port=5000
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})