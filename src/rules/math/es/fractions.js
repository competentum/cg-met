/**
 * Created by Shayakhmetov on 02.11.2016.
 */
'use strict';

var SIGNS = [
    {mask: /the one half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 2},
    {mask: /and 1 half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
    {mask: /y medio/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
    {mask: /and a half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
    {mask: /half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 0}
];


module.exports = SIGNS;