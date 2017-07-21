/**
 * Created by Shayakhmetov on 22.09.2016.
 */
'use strict';

var RULES = [
    {mask: /sequence [^\s]+ [^\s]+ as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
        var params = text.replace('sequence ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
        return '\\{' + params[0] + '_' + params[1] + '\\}_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}';
    }, exp: function(text){
        var params = text.replace('sequence ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
        return '{' + params[0] + '_' + params[1] + '}_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}';
    }},
    {mask: /sequence [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('sequence ', '').split(' ');
        return '\\{' + params[0] + '_' + params[1] + '\\}';
    }},
    {mask: /sum of [^\s]+ [^\s]+ as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
        var params = text.replace('sum of ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
        return '\\sum_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}' + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('sum of ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
        return 'sum_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}' + params[0] + '_' + params[1];
    }},
    {mask: /series [^\s]+ [^\s]+/g, latex: function(text){
        var params = text.replace('series ', '').split(' ');
        return '\\sum' + params[0] + '_' + params[1];
    }, exp: function(text){
        var params = text.replace('series ', '').split(' ');
        return 'sum' + params[0] + '_' + params[1];
    }, priority: -1},
    {mask: /sequence [^\s]+ [^\s]+ converges to/g, latex: function(text){
        var params = text.replace('sequence ', '').replace(' converges to', '').split(' ');
        return params[0] + '_' + params[1] + '\\to';
    }, exp: function(text){
        var params = text.replace('sequence ', '').replace(' converges to', '').split(' ');
        return params[0] + '_' + params[1] + 'to';
    }},
    {mask: /[^\s]+ [^\s]+ converges to/g, latex: function(text){
        var params = text.replace(' converges to', '').split(' ');
        return params[0] + '_' + params[1] + '\\to';
    }, exp: function(text){
        var params = text.replace(' converges to', '').split(' ');
        return params[0] + '_' + params[1] + 'to';
    }},
    {mask: /[^\s]+ [^\s]+ diverges to infinity/g, latex: function(text){
        var params = text.replace(' diverges to infinity', '').split(' ');
        return params[0] + '_' + params[1] + '\\to\\infty';
    }, exp: function(text){
        var params = text.replace(' diverges to infinity', '').split(' ');
        return params[0] + '_' + params[1] + 'to infty';
    }},
    {mask: /series [^\s]+ [^\s]+ diverges/g, latex: function(text){
        var params = text.replace(' diverges', '').split(' ');
        return params[0] + '_' + params[1] + '\\to\\infty';
    }, exp: function(text){
        var params = text.replace(' diverges', '').split(' ');
        return params[0] + '_' + params[1] + 'to infty';
    }},
    {mask: /[^\s]+ [^\s]+ diverges/g, latex: function(text){
        var params = text.replace(' diverges', '').split(' ');
        return '\\sum' + params[0] + '_' + params[1] + '=\\infty';
    }, exp: function(text){
        var params = text.replace(' diverges', '').split(' ');
        return 'sum' + params[0] + '_' + params[1] + '= infty';
    }},
    {mask: /[^\s]+ [^\s]+ goes to infinity/g, latex: function(text){
        var params = text.replace(' goes to infinity', '').split(' ');
        return params[0] + '_' + params[1] + '\\to\\infty';
    }, exp: function(text){
        var params = text.replace(' goes to infinity', '').split(' ');
        return params[0] + '_' + params[1] + 'to infty';
    }},
    {mask: /[^\s]+ [^\s]+ approaches infinity/g, latex: function(text){
        var params = text.replace(' approaches infinity', '').split(' ');
        return params[0] + '_' + params[1] + '\\to\\infty';
    }, exp: function(text){
        var params = text.replace(' approaches infinity', '').split(' ');
        return params[0] + '_' + params[1] + 'to infty';
    }}
];

module.exports = RULES;