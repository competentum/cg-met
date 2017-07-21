/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

var RULES = [
    {mask: / of [^\s]+/g, latex: function(text){
        return text.replace(' of ', '(') + ')';
    }, priority: '-1'},
    {mask: / is a function of [^\s]+/g, latex: function(text){
        return text.replace(' is a function of ', '(') + ')';
    }, priority: '-1'},
    {mask: /domain of the function /g, latex: 'D_'},
    {mask: /range of the function /g, latex: 'R_'},
    {mask: /composition of the functions [^\s]+ and [^\s]+/g, latex: function(text){
        return text.replace('composition of the functions ', '').replace(' and ', '\\circ');
    }, exp: function(text){
        return text.replace('composition of the functions ', '').replace(' and ', '@');
    }}
];

module.exports = RULES;