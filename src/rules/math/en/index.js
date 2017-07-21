/**
 * Created by Shayakhmetov on 23.08.2016.
 */

'use strict';

var numbersProcessing = require('./number');
var symbols = require('./symbol');
var operators = require('./operator');
var fractions = require('./fractions');
var sets = require('./set');
var logic = require('./logic');
var calculus = require('./calculus/index');
var chemistry = require('./chem/index');
var postprocessing = require('./postprocessing');

module.exports = function(text, options){
    var exp;
    switch(options.type){
        case 'algebra':
            var masks = [].concat(fractions, symbols, operators, calculus);
            masks.sort(compare);
            exp = process(numbersProcessing(text), masks, options.output);
            break;
        case 'set':
            var masks = [].concat(fractions, sets);
            masks.sort(compare);
            exp = process(numbersProcessing(text), masks, options.output);
            break;
        case 'logic':
            var masks = [].concat(fractions, logic, sets, operators);
            masks.sort(compare);
            exp = process(numbersProcessing(text), masks, options.output);
            break;
      case 'chem':
            var masks = [].concat(chemistry);
            masks.sort(compare);
            exp = process(numbersProcessing(text), masks, options.output);
            console.log('==================='+exp+'==================')
            break;
    };
    return postprocessing(exp);
};

function process(text, masks, output){
    var resultStr = text;
    masks.forEach(function(sign){
        var format = (output in sign)? output : 'latex';
        resultStr = resultStr.replace(sign.mask, sign[format]);
    });
    return resultStr;
}

function compare(a,b){
    if(!('priority' in a))
        a.priority = 0;
    if(!('priority' in b))
        b.priority = 0;
    if(a.priority < b.priority)
        return 1;
    if(a.priority > b.priority)
        return -1;
    return 0;
}
/*
function numbersProcessing(text){
    return text;
}*/
