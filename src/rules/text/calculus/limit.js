/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

/*var tmplStr = require('../../tmplStr');*/

var RULES = [
    {mask: /limit of [^\s]+ [^\s]+ as [^\s]+ tends to [^\s]+/g, latex: function(text){
        var params = text.replace('limit of ', '').replace('as ', '').replace('tends to ', '').split(' ');
        return /*tmplStr(params, '\\lim_{${2}\\to${3}}${0}_${1}');*/'\\lim_{' + params[2] + '\\to' + params[3] + '}' + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('limit of ', '').replace('as ', '').replace('tends to ', '').split(' ');
        return 'lim_{' + params[2] + 'to' + params[3] + '}' + params[0] + '_' + params[1];
    }},
    {mask: /[^\s]+ [^\s]+ converges to [^\s]+ as [^\s]+ tends to [^\s]+/g, latex: function(text){
        var params = text.replace('converges to ', '').replace('as ', '').replace('tends to ', '').split(' ');
        return '\\lim_{' + params[3] + ' \\to ' + params[4] + '}' + params[0] + '_' + params[1] + '=' + params[2];
    }, exp: function(text){
        var params = text.replace('converges to ', '').replace('as ', '').replace('tends to ', '').split(' ');
        return 'lim_{' + params[3] + ' to ' + params[4] + '}' + params[0] + '_' + params[1] + '=' + params[2];
    }},
    {mask: /[^\s]+ from the (left|right)/g, latex: function(text){
        return '{' + text.replace('from the ', '').replace(' left', '-0').replace(' right', '+0') + '}';
    }},
    {mask: /limit of [^\s]+ of [^\s]+ as [^\s]+ approaches [^\s]+/g, latex: function(text){
        var params = text.replace('limit of ', '').replace('of ', '').replace('as ', '').replace('approaches ', '').replace('from the ', '').split(' ');
        return '\\lim_{' + params[2] + ' \\to ' + params[3] + '}' + params[0] + '(' + params[1] + ')';
    }, exp: function(text){
        var params = text.replace('limit of ', '').replace('of ', '').replace('as ', '').replace('approaches ', '').replace('from the ', '').split(' ');
        return 'lim_{' + params[2] + ' to ' + params[3] + '}' + params[0] + '(' + params[1] + ')';
    }},
    {mask: / and /g, latex: '\\wedge', exp: '^^'},
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