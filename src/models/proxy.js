const mongoose = require("mongoose");

const proxySchema = mongoose.Schema({
    domain: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    }
});

const proxy = mongoose.model('proxy', proxySchema);

module.exports = proxy;