const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// const server = https.createServer(function(req, res) {

// })
app.get("/home", (req, res) => {
    res.render('pages/home');
})
app.listen(port, function(error) {
    if(error) {
        console.log("Error", error)
    } else {
        console.log("Server is listening " + port)
    }
})