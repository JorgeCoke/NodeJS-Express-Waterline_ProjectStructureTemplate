var Waterline = require('waterline');
var config = require('../config');
var fs = require('fs');
var path = require("path");

var orm = new Waterline();

// Loads all models from current directory
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "_index.js");
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file));
        orm.loadCollection(model);
    });

module.exports = { waterline: orm, config: config.database };