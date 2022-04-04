const express = require("express");

const app = express();

app.get("/home", (req, res) => {
     res.send ("Hello")
});

app.get("/book", (req, res) => {
    res.send ([
        {book1 : "I am Book 1"},
        {book2 : "I am Book 2"},
        {book3 : "I am Book 3"},
        {book4 : "I am Book 4"},
    ])
});

app.listen(5000, () => {
    console.log("listening on port 5000")
})