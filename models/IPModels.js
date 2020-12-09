const mongoose = require('mongoose');

const IPModelschema = new mongoose.Schema({
    ip_start: Number,
    ip_end: Number,
    country_code: String,
    country_name: String
});

module.exports = mongoose.model("IPLocations", IPModelschema, "ipLocation");