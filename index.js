// initializtion
const express = require('express'); 
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://haha5751:hh431809@cluster0.dayqc.mongodb.net/3308DB?retryWrites=true&w=majority";
IPLocations = require("./models/IPModels");
mongoose.connect(dbUrl, {
    'useNewUrlParser': true
});
// connect to db
mongoose.set('useUnifiedTopology', true);

// convert ip to long
// credit: https://gist.github.com/jppommet/5708697
function ip2int(ip) {
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
}

// check if ip is valid
// credit : https://www.w3resource.com/javascript/form/ip-address-validation.php
function isProperIP(ip) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {  
      return (true)  
    }   
    return (false)
  }  

// stylesheets, scripts and img
app.use(express.static("public"));

// ejs
app.set('view engine', 'ejs');

// app get requests

// home
app.get("/", (req, res) => {
    res.render('pages/home', {
        title: "Home"
    }); 
});
// getLocation
app.get("/getLocation", (req, res) => {
    res.render('pages/getLocation', {
        title: "getLocation",
        result: "0"
    });
});
// getLocation user submits IP 
app.get("/getLocation/submit", (req, res) => {
    var ip_address = req.query.getLocation_ip_address;
    var ip_location = "0";
    if(isProperIP(ip_address)) {
        ip_address = ip2int(ip_address);
        ip_location = {ip_end:{$gte:ip_address}}; 
        IPLocations.findOne(ip_location, function(err, results) {
            if(err) {
                console.log("Error, line 65 index.js", err);
            } else {
                res.render('pages/getLocation', {
                    title: "Get Location",
                    result: results
                });
            }
        });
    } else {
        ip_location = "error";
        res.render('pages/getLocation', {
            title: "getLocation",
            result: ip_location 
        });      
    }
});   

// localhost
app.listen(port, function(error) {
    if(error) {
        console.log("Error", error)
    } else {
        console.log("Server is listening " + port)
    }
})
