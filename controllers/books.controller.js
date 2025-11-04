import books from "../book.js";

export const getAllBooks= (req, res) => {
    const search = (req.query.search || "");
    const limitValue = +req.query.limit || 5;
    const skipValue = +req.query.skip || 0;
    let result = books;
    if (search) {
        result = result.filter(x => x.name.includes(search));
    }
    result = result.slice(skipValue, skipValue + limitValue);
    res.json(result);
};
export const getBookById = (req,res)=>{
    console.log(req.params);
    console.log(req.query);
    const book=books.find(x=>x.code===+req.params.id)
    res.json(book)
}
export const addBook = (req,res)=>{
    console.log(req.body);
    books.push(req.body);
    res.send(req.body);   
}
export const updateBook= (req,res)=>{
    const id=+req.params.id

    const bookIndex = books.findIndex(x => x.code === id)
if (bookIndex !== -1) {
  books[bookIndex] = { ...books[bookIndex], ...req.body } 
}
    res.json({index:bookIndex,message:"book updated",books})    
}


export const lendBook = (req,res)=>{
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
}
export const returnBook = (req,res)=>{
    const bookId=+req.params.code
    const bookIndex = books.findIndex(x => x.code === bookId)
    if (bookIndex !== -1) 
    {
        books[bookIndex].isBorrowed=false
    }
}
export const deleteBook = (req,res)=>{
    const bookIndex = books.findIndex(x => x.code === +req.params.id)
    if(bookIndex!==-1)
    {
        books.splice(bookIndex,1)
        res.json({message:"deleted",books})
    }
}