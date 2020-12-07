// initializtion
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
IPLocation = require("./models/IPModels")
const assert = require('assert');
const url = "mongodb+srv://haha5751:hh431809@cluster0.dayqc.mongodb.net/3308DB?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true
});
mongoose.set('useUnifiedTopology', true);

// stylesheets, scripts and img
app.use(express.static("public"));

// use ejs
app.set('view engine', 'ejs');

// get requests
app.get("/", (req, res) => {
    IPLocation.find({}, (err, IPLocations) => {
        if(err) {
            console.log("Error Line 27, index.j s", err);
        } else {
            res.render('pages/home', {
                data: IPLocations,
                title: "home"
            });
        }
    });
});
app.get("/getLocation", (req, res) => {
    IPLocation.find({}, (err, IPLocations) => {
        if(err) {
            console.log("Error Line 40, index.j s", err);
        } else {
            res.render('pages/getLocation', {
                data: IPLocations,
                title: "getLocation"
            });
        }
    });
});

// localhost
app.listen(port, function(error) {
    if(error) {
        console.log("Error", error)
    } else {
        console.log("Server is listening " + port)
    }
})


    // MongoClient.connect(url, function (err, client) {
    //     if(err) {
    //         console.log("Error, MongoClient ", err);
    //     } else {
    //         const dbo = client.db("3308DB");
    //         const ipLocation = dbo.collection("ipLocation");
    //         const query = {ip_start: "16777216"};
    //         ipLocation.findOne(query, function (err, ipLocations) {
    //             if(err) {
    //                 console.log("Error, ipLocation.find ", err);
    //             } else {
    //                 console.log("ipLocations ",ipLocations);
    //                 res.render('pages/getLocation', { data: ipLocations});
    //             }
    //         });
    //     }
    // });

// mongoimport -u mongoAdmin -p changeMe --authenticationDatabase admin --drop --db ip2location --collection db24 --type csv --file "/Users/harrishafeez/Downloads/IP2LOCATION-LITE/IP2LOCATION-LITE-DB1.CSV" --fields ip_from,ip_to,country_code,country_name