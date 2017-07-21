/**
 * Created by Shayakhmetov on 21.09.2016.
 */
'use strict';

var RULES = [
  {mask: /( de |^de )/g, exp: ''},
  {mask: /( la |^la )/g, exp: ''}
];

module.exports = function(text){
    var exp = text;
    RULES.forEach(function(rule){
        exp = exp.replace(rule.mask, rule.exp);
    });
    return exp;
};