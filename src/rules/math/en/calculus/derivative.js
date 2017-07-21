/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

var RULES = [
    {mask: /d 2 [^\s]+ by d [^\s]+ squared/g, latex: function(text){
        var params = text.replace('by d ', '').replace(' squared', '').replace(/^d 2 /, '').split(' ');
        return '\\frac{d^2 ' + params[0] + '}{d ' + params[1] + '^2}';
    }, exp: function(text){
        var params = text.replace('by d ', '').replace(/^d /, '');
        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
    }, priority: 1},
    {mask: /\d+?-th derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
        var params = text.replace('-th derivative of ', ' ').replace('with respect to ', '').split(' ');
        return '\\frac{d^' + params[0] + ' ' + params[1] + '}{d ' + params[2] + '^' + params[0] + '}';
    }, exp: function(text){
        var params = text.replace('-th derivative of ', '').replace('with respect to ', '').split(' ');
        return '\\frac{d^' + params[0] + ' ' + params[1] + '}{d ' + params[2] + '^' + params[0] + '}';
    }, priority: 1},

    {mask: /partial d [^\s]+ by d [^\s]+/g, latex: function(text){
        var params = text.replace('by d ', '').replace('partial d ', '').split(' ');
        return '\\frac{\\partial ' + params[0] + '}{\\partial ' + params[1] + '}';
    }, exp: function(text){
        var params = text.replace('by d ', '').replace('partial d ', '').split(' ');
        return 'frac{del ' + params[0] + '}{del ' + params[1] + '}';
    }, priority: 1},
    {mask: /\d+?-th partial derivative of [^\s]+ with respect to [^\s]+ and [^\s]+/g, latex: function(text){
        var params = text.replace('-th partial derivative of ', ' ').replace('with respect to ', '').replace('and ', '').split(' ');
        return '\\frac{\\partial ^' + params[0] + ' ' + params[1] + '}{\\partial ' + params[2] + '\\partial ' + params[3] + '}';
    }, exp: function(text){
        var params = text.replace('-th partial derivative of ', ' ').replace('with respect to ', '').replace('and ', '').split(' ');
        return 'frac{del ^' + params[0] + ' ' + params[1] + '}{del ' + params[2] + 'del ' + params[3] + '}';
    }},
    {mask: /partial derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
        var params = text.replace('partial derivative of ', '').replace('with respect to ', '').split(' ');
        return '\\frac{\\partial ' + params[0] + '}{\\partial ' + params[1] + '}';
    }, exp: function(text){
        var params = text.replace('partial derivative of ', '').replace('with respect to ', '').split(' ');
        return 'frac{del ' + params[0] + '}{del ' + params[1] + '}';
    }},

    {mask: /d [^\s]+ by d [^\s]+/g, latex: function(text){
        var params = text.replace('by d ', '').replace(/^d /, '').split(' ');
        return '\\frac{d ' + params[0] + '}{d ' + params[1] + '}';
    }, exp: function(text){
        var params = text.replace('by d ', '').replace(/^d /, '').split(' ');
        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
    }},
    {mask: /derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
        var params = text.replace('derivative of ', '').replace('with respect to ', '').split(' ');
        return '\\frac{d ' + params[0] + '}{d ' + params[1] + '}';
    }, exp: function(text){
        var params = text.replace('derivative of ', '').replace('with respect to ', '').split(' ');
        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
    }},

    {mask: /differential of/g, latex: 'd'},
    {mask: /double prime/g, latex: '\\prime\\prime', exp: "''"},
    {mask: /second derivative of [^\s]+/g, latex: function(text){
        return text.replace('second derivative of ', '') + '\\prime\\prime';
    }, exp: function(text){
        return text.replace('second derivative of ', '') + "''";
    }},
    {mask: /triple prime/g, latex: '\\prime\\prime\\prime', exp: "'''"},
    {mask: /third derivative of [^\s]+/g, latex: function(text){
        return text.replace('third derivative of ', '') + '\\prime\\prime\\prime';
    }, exp: function(text){
        return text.replace('third derivative of ', '') + "'''";
    }},
    {mask: /prime/g, latex: '\\prime', exp: "'"},
    {mask: /derivative of .+? of the order [^\s]+/g, latex: function(text){
        return text.replace('derivative of ', '').replace(' of the order ', '^');
    }},
    {mask: /derivative of [^\s]+/g, latex: function(text){
        return text.replace('derivative of ', '') + '\\prime';
    }, exp: function(text){
        return text.replace('derivative of ', '') + "'";
    }},
    {mask: /[^\s]+-th derivative of [^\s]+/g, latex: function(text){
        var order = text.substring(0, text.indexOf('-th derivative of'));
        var func = text.substring(text.lastIndexOf('-th derivative of')).replace('-th derivative of', '');
        return func + '^{(' + order + ')}';
    }}
];

module.exports = RULES;