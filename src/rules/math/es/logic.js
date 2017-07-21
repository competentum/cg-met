/**
 * Created by Shayakhmetov on 21.09.2016.
 */
'use strict';

var RULES = [
    {mask: / o /g, latex: '\\lor', exp: 'vv'},
    {mask: / y /g, latex: '\\wedge', exp: '^^', priority: -1},
    {mask: / no /g, latex: '\\bar', exp: 'bar'},
    {mask: / implica /g, latex: '\\Rightarrow', exp: 'rArr'},
    {mask: / es equivalente a /g, latex: '\\sim', exp: '~'},
];

module.exports = RULES;