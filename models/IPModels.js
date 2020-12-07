const mongoose = require('mongoose');

const IPModelschema = new mongoose.Schema({
    ip_start: String,
    ip_end: String,
    country_code: String,
    country_name: String
});

module.exports = mongoose.model("IPLocation", IPModelschema);