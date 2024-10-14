const express = require('express');
const app = express();
//lets make our default page display views to .ejs extension rather than html
app.set("view engine" , "ejs")
const library = require("./routes/router");
//Down we are going to be using body-parser to get data from forms
const bodyParser = require('body-parser');
//lets make sure that our app makes use of the body parser
app.use(bodyParser.json());
//the above code makes sure that once we get the data from a form we conevert it immediately to json format
app.use(bodyParser.urlencoded({extended : true}));
//the above code enables us to get web address parts value from the server
//lets send the books below to the page for display
const books = [{
    bookName: "Harry Potter and the Philosopher",
    bookAuthor: "J.K.Rowling",
    bookPages: 223,
    bookPrice: "20$",
    bookState: "Available"
},
{
    bookName: "harry Potter and the Chamber of Secrets",
    bookAuthor: "J.K.Rowling",
    bookPages: 251,
    bookPrice: "20$",
    bookState: "Available"
},
{
    bookName: "Harry Potter and the Prisoner of Azkaban",
    bookAuthor: "J.K.Rowling",
    bookPages: 317,
    bookPrice: "30$",
    bookState: "Available"
},
{
    bookName: "Harry Potter and the Goblet of Fire",
    bookAuthor: "J.K.Rowling",
    bookPages: 636,
    bookPrice: "55$",
    bookState: "Available"
},
{
    bookName: "Harry Potter and the Order of the Phoenix",
    bookAuthor: "J.K.Rowling",
    bookPages: 766,
    bookPrice: "60$",
    bookState: "Available"
},
{
    bookName: " Harry Potter and the Half-Blood Prince",
    bookAuthor: "J.K.Rowling",
    bookPages: 607,
    bookPrice: "50$",
    bookState: "Available"
},
{
    bookName: "Harry Potter and the Deathly Hallows",
    bookAuthor: "J.K.Rowling",
    bookPages: 607,
    bookPrice: "50$",
    bookState: "Available"
},
{
    bookName: "Rich Dad Poor Dad",
    bookAuthor: "Robert Kiyosaki and Sharon L. Lechter",
    bookPages: 336,
    bookPrice: "50$",
    bookState: "Available"
},
{
    bookName: "the subtle art of not giving afu*k (فن اللامبالاه)",
    bookAuthor: "MARK MANSON",
    bookPages: 336,
    bookPrice: "50$",
    bookState: "Available"
}
]
const PORT = process.env.PORT || 2000;
const hostname = "127.0.0.1"
//below lets perform a book addition function to our books array.We are able to perform this functionality by the use of,
//req.body.valueName using a post method
app.post("/", (req, res) => {
    //below we are setting a structure of how we are going to be getting values from the form
    const bookName = req.body.bookName;
    const bookAuthor = req.body.bookAuthor;
    const bookPages= req.body.bookPages;
    const bookPrice = req.body.bookPrice;
    const bookState = req.body.bookState;

    if(bookName ==="" && bookAuthor==="", bookPages==="", bookPrice===""){
       console.log("The fields are empty please add fill them in to add a book");
    }

    books.push({
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookPages: bookPages,
        bookPrice: bookPrice,
        bookState: "Available"
    })

    res.render("index", {data: books})

})




const server = app.get("/", (req, res) => {
    res.render("index", {data: books});
});
app.post("/reserved", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if(book.bookName == requestedBook){
            book.bookState = "reserved";
        }
    })
    res.render("index", {data: books});
});
app.post("/return", (req, res) => {
    const requestedBook = req.body.bookName;
    books.forEach(book => {
        if(book.bookName == requestedBook){
            book.bookState = "Available";
        }
    })
    res.render("index", {data: books});
});
app.post("/delete", (req, res) => {
    const deleteBook = req.body.bookName;
    let i = 0;
    books.forEach(book => {
        i = i + 1;
        if(book.bookName == deleteBook){
            books.splice((i - 1), 1);
        }
    });
    res.render("index", {data: books});
})
//below is a search function

server.listen(PORT, hostname,  () => {
  console.log(`The server is running at http://${hostname}:${PORT}`)   
});
// search 
app.post("/search", (req, res) => {
    const searchQuery = req.body.bookName.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.bookName.toLowerCase().includes(searchQuery)
    );
    res.render("index", { data: filteredBooks });
 });
 