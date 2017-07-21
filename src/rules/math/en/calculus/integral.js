/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

var RULES = [
    {mask: /double integral (from .+? to [^\s]+)?/g, latex: function(text){
        return text.replace('double integral ', '\\iint').replace('from ', '_{').replace(' to ', '}^{') + '}';
    }, exp: function(text){
        return text.replace('double integral ', 'intint').replace('from ', '_{').replace(' to ', '}^{') + '}';
    }},
    {mask: /triple integral (from .+? to [^\s]+)?/g, latex: function(text){
        return text.replace('triple integral ', '\\iiint').replace('from ', '_{').replace(' to ', '}^{') + '}';
    }, exp: function(text){
        return text.replace('triple integral ', 'intintint').replace('from ', '_{').replace(' to ', '}^{') + '}';
    }},
    {mask: /integral (from .+? to [^\s]+)?/g, latex: function(text){
        var close = (text.indexOf('from') > -1)? '}' : '';
        return text.replace('integral ', '\\int').replace('from ', '_{').replace(' to ', '}^{') + close;
    }, exp: function(text){
        var close = (text.indexOf('from') > -1)? '}' : '';
        return text.replace('integral ', 'int').replace('from ', '_{').replace(' to ', '}^{') + close;
    }}
];

module.exports = RULES;