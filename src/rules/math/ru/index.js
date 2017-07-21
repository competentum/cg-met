/**
 * Created by Makarova on 09.12.2016.
 */

'use strict';
var symbols = require('./symbol');
var operators = require('./operator');
var fractions = require('./fractions');
var postprocessing = require('./postprocessing');

var Az = require('az');


module.exports = function(text, options){

  var exp;
  switch(options.type){
    case 'algebra':
      var masks = [].concat(fractions, symbols, operators);
      masks.sort(compare);
      exp = process(numbersProcessing(text), masks, options.output);
      break;
    case 'set':
      break;
    case 'logic':
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
