// initializtion
const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://haha5751:hh431809@cluster0.dayqc.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// connect application to mongoDB cluster
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    } finally {
    await client.close();
  }
}
run().catch(console.dir);

// stylesheets, scripts and img
app.use(express.static("public"));

// use ejs
app.set('view engine', 'ejs');

// get requests
app.get("/", (req, res) => {
    res.render('pages/home');
})
app.get("/getLocation", (req, res) => {
    res.render('pages/getLocation');
})

// localhost
app.listen(port, function(error) {
    if(error) {
        console.log("Error", error)
    } else {
        console.log("Server is listening " + port)
    }
})