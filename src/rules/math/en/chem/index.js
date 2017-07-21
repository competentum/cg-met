/**
 * Created by Shayakhmetov on 22.09.2016.
 */

var elements = require('./element');
var formula = require('./formulas');
var pre = require('./preprocessing');


module.exports = [].concat(pre, elements, formula);