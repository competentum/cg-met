/**
 * Created by Shayakhmetov on 21.09.2016.
 */
'use strict';

var RULES = [
    {mask: / or /g, latex: '\\lor', exp: 'vv'},
    {mask: / and /g, latex: '\\wedge', exp: '^^', priority: -1},
    {mask: / not /g, latex: '\\bar', exp: 'bar'},
    {mask: / implies /g, latex: '\\Rightarrow', exp: 'rArr'},
    {mask: / is equivalent to /g, latex: '\\sim', exp: '~'},
    {mask: /for any/g, latex: '\\forall', exp: 'AA'},
    {mask: /for all/g, latex: '\\forall', exp: 'AA'},
    {mask: /there exists/g, latex: '\\exists', exp: 'EE'},
    {mask: /such that/g, latex: ':'},
    {mask: /real [^\s]+/g, latex: function(text){
        return text.replace('real ', '') + '\\in\\mathbb{R}';
    }, exp: function(text){
        return text.replace('real ', '') + 'in RR';
    }},
    {mask: /integer [^\s]+/g, latex: function(text){
        return text.replace('integer ', '') + '\\in\\mathbb{N}';
    }, exp: function(text){
        return text.replace('integer ', '') + 'in NN';
    }}
];

module.exports = RULES;