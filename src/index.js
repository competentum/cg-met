/**
 * Created by 96664_000 on 16.08.2016.
 */
'use strict';

var merge = require('merge');
var processing = require('./rules');
var asciiMath = require('ascii-math');

var OPTIONS = {
    input: 'text',
    output: 'mathml',
    type: 'algebra',
    lang: 'en',
    callback: function(){}
};

module.exports = function(text, settings){
    var settings = merge.recursive(OPTIONS, settings);
    var result;
    switch(settings.output){
        case 'mathml':
            settings.output = 'exp';
            var exp = processing(text, settings);
            result = asciiMath(exp);
            break;
        case 'ascii':
            settings.output = 'exp';
            result = processing(text, settings);
            break;
        case 'latex':
            result = processing(text, settings);
            break;
        case 'text':
            result = processing(text, settings);
            break;
        case 'text_openEdx':
            result = processing(text, settings);
            break;
    }
    return result;
};