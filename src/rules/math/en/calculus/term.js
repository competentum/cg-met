/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

var RULES = [
    {mask: /the laplace operator of/g, latex: '\\Delta', exp: 'Delta'},
    {mask: /the Laplacian of/g, latex: '\\Delta', exp: 'Delta'},
    {mask: /nabla/g, latex: '\\nabla', exp: 'grad'},
    {mask: /gradient of/g, latex: '\\nabla', exp: 'grad'},
    {mask: /gradient/g, latex: '\\mathbf{grad}', exp: 'bb{g\\rad}'},
    {mask: /divergence/g, latex: '\\mathbf{div}', exp: 'bb{d\iv}'},
    {mask: /rotor/g, latex: '\\mathbf{rot}', exp: 'bb{rot}'},
    {mask: /imaginary part of/g, latex: 'Im'},
    {mask: /real part of/g, latex: 'Re'},
    {mask: /as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
        return text.replace('as ', '_{').replace(' goes from ', '=').replace(' to ', '}^{') + '}';
    }},
    {mask: /as [^\s]+ runs over [^\s]+ to [^\s]+/g, latex: function(text){
        return text.replace('as ', '_{').replace(' runs over ', '\\in').replace(' to ', '}^{') + '}';
    }, exp: function(text){
        return text.replace('as ', '_{').replace(' runs over ', 'in').replace(' to ', '}^{') + '}';
    }},
    {mask: /as [^\s]+ is positive/g, latex: function(text){
        return text.replace('as ', '_{').replace(' is positive', '\\gt0}');
    }, exp: function(text){
        return text.replace('as ', '_{').replace(' is positive', '>0}');
    }},
    {mask: /as [^\s]+ is negative/g, latex: function(text){
        return text.replace('as ', '_{').replace(' is negative', '\\lt0}');
    }, exp: function(text){
        return text.replace('as ', '_{').replace(' is negative', '<0}');
    }},
    {mask: /residue of [^\s]+ of [^\s]+ at [^\s]+ equals [^\s]+/g, latex: function(text){
        var params = text.replace('residue of ', '').replace('of ', '').replace('at ', '').replace('equals ', '').split(' ');
        return 'res ' + '_{' + params[2] + '=' + params[3] + '}' + params[0] + '(' + params[1] + ')';
    }},
    {mask: /minimum of [^\s]+ of [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
    }, exp: function(text){
        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
    }},
    {mask: /maximum of [^\s]+ of [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
    }, exp: function(text){
        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
    }},
    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return '\\sum' + params[2] + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return 'sum' + params[2] + params[0] + '_' + params[1];
    }},
    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return '\\sum' + params[2] + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return 'sum' + params[2] + params[0] + '_' + params[1];
    }},
    {mask: /product of [^\s]+ [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('product of ', '').split(' ');
        return '\\sum' + params[2] + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('product of ', '').split(' ');
        return 'sum' + params[2] + params[0] + '_' + params[1];
    }}
];

module.exports = RULES;