/**
 * Created by Shayakhmetov on 22.09.2016.
 */

var derivatives = require('./derivative');
var functions = require('./function');
var integral = require('./integral');
var limit = require('./limit');
var series = require('./series');
var term = require('./term');


module.exports = [].concat(derivatives, functions, integral, limit, series, term);