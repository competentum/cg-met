/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

var RULES = [
    {mask: /\\Delta/g, en: 'the Laplacian of', exp: 'Delta'},
    {mask: /\\nabla/g, en: 'gradient of', exp: 'grad'},
    {mask: /\\mathbf\{grad\}/g, en: 'gradient', exp: 'bb{g\\rad}'},
    {mask: /\\mathbf\{div\}/g, en: 'divergence', exp: 'bb{d\iv}'},
    {mask: /\\mathbf\{rot\}/g, en: 'rotor', exp: 'bb{rot}'},
    {mask: /Im/g, en: 'imaginary part of'},
    {mask: /Re/g, en: 'real part of'},
    {mask: /_\{[^\s]+?=\}/g, en: function(text){
        return text.replace('as ', '_{').replace(' goes from ', '=').replace(' to ', '}^{') + '}';
    }},
    {mask: /as [^\s]+ runs over [^\s]+ to [^\s]+/g, en: function(text){
        return text.replace('as ', '_{').replace(' runs over ', '\\in').replace(' to ', '}^{') + '}';
    }, exp: function(text){
        return text.replace('as ', '_{').replace(' runs over ', 'in').replace(' to ', '}^{') + '}';
    }},
    {mask: /as [^\s]+ is positive/g, en: function(text){
        return text.replace('as ', '_{').replace(' is positive', '\\gt0}');
    }, exp: function(text){
        return text.replace('as ', '_{').replace(' is positive', '>0}');
    }},
    {mask: /as [^\s]+ is negative/g, en: function(text){
        return text.replace('as ', '_{').replace(' is negative', '\\lt0}');
    }, exp: function(text){
        return text.replace('as ', '_{').replace(' is negative', '<0}');
    }},
    {mask: /residue of [^\s]+ of [^\s]+ at [^\s]+ equals [^\s]+/g, en: function(text){
        var params = text.replace('residue of ', '').replace('of ', '').replace('at ', '').replace('equals ', '').split(' ');
        return 'res ' + '_{' + params[2] + '=' + params[3] + '}' + params[0] + '(' + params[1] + ')';
    }},
    {mask: /minimum of [^\s]+ of [^\s]+ [^\s]+/g, en: function(text){
        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
    }, exp: function(text){
        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
    }},
    {mask: /maximum of [^\s]+ of [^\s]+ [^\s]+/g, en: function(text){
        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
    }, exp: function(text){
        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
    }},
    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, en: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return '\\sum' + params[2] + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return 'sum' + params[2] + params[0] + '_' + params[1];
    }},
    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, en: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return '\\sum' + params[2] + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('sum of ', '').split(' ');
        return 'sum' + params[2] + params[0] + '_' + params[1];
    }},
    {mask: /product of [^\s]+ [^\s]+ [^\s]+/g, en: function(text){
        var params = text.replace('product of ', '').split(' ');
        return '\\sum' + params[2] + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('product of ', '').split(' ');
        return 'sum' + params[2] + params[0] + '_' + params[1];
    }}
];

module.exports = RULES;