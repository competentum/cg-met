/**
 * Created by Shayakhmetov on 23.08.2016.
 */

'use strict';

var symbols = require('./symbol');
var operators = require('./operator');
var fractions = require('./fractions');
var sets = require('./set');
var logic = require('./logic');
var calculus = require('./calculus/index');
var chemistry = require('./chem/index');

module.exports = function(exp, options){
    var text, masks;
    switch(options.type){
        case 'algebra':
            masks = [].concat(fractions, symbols, operators);
            break;
        case 'set':
            masks = [].concat(fractions, sets);
            break;
        case 'logic':
            masks = [].concat(fractions, logic, sets, operators);
            break;
      case 'chem':
            masks = [].concat(chemistry);
            break;
    }
    masks.sort(compare);
    //console.log(masks);
    text = process(exp, masks, options.lang, options.output);
    return text;
};



function process(exp, masks, lang, output){
    var resultStr = exp;
        masks.forEach(function(sign){
            var lang = (lang in sign)? lang : 'en';
            if( output === 'text' ){
                resultStr = resultStr.replace(sign.mask, sign[lang]);
            }
            else{
                if(sign.oedx){
                    resultStr = resultStr.replace(sign.mask, sign[lang]);
                }
            }
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
