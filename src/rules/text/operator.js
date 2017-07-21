'use strict';

var SIGNS = [
    {mask: /\./g, en: ' point ', priority: 1},

    {mask: /[^\s]+ (plus|minus|times|over|divided by|by) .+ quantity/g, en: function(text){
        return '(' + text.replace(' quantity', ')');
    }},

    {mask: /\+/g, oedx: /\+/g, en: ' plus '},

    {mask: /-/g,  oedx: /-/g,en: ' minus ', priority: 1},

    {mask: /\\pm/g, en: ' plus minus ', priority: 2},

    {mask: /\\pm/g, en: ' plus minus ', priority: 2},

    {mask: /\\times/g, en: 'times', exp: ' times '},
    {mask: /\*/g, oedx:/\*/g, en: ' multiplied by ', exp: ' times '},
    {mask: /\×/g, oedx:/\×/g, en: ' multiplied by ', exp: ' times '},

    {oedx:/log/g, en: ' logarithm '},
    {oedx:/log10/g, en: ' common logarithm '},
    {oedx:/log2/g, en: ' binary logarithm '},
    {oedx:/exp/g, en: ' natural logarithm '},


    {oedx:/sin/g, en: ' sinus '},
    {oedx:/cos/g, en: ' cosinus  '},
    {oedx:/tan/g, en: ' tangent  '},
    {oedx:/cot/g, en: ' cotangent  '},

    {oedx:/ln/g, en: ' natural logarithm '},

    {mask: /\\cdot/g, en: ' multiplied by ', exp: 'times', priority: 0},

    {mask: /\//g, en: ' divided by '},
    {mask: /\\frac{(.+?)}{(.+?)}/g, en: function(exp){
        var params = exp.match(/{(.+?)}{(.+?)}/);
        return ' ratio of ' + params[1] + ' and ' + params[2];
    }},

    {mask: /=/g, en: ' equals '},
    {mask: /\\approx/g, en: ' is approximately equal to '},
    {mask: /\\dashv/g, en: ' is identically equal to '},
    {mask: /\\neq/g, en: ' is not equal to '},
    {mask: /\\gt/g, en: ' is greater than '},
    {mask: /\\lt/g, en: ' is less than '},
    {mask: /\\geq/g, en: ' is greater than or equal to '},
    {mask: /\\leq/g, en: ' is less than or equal to '},

    {mask: /\|[^\|]+?\|/g,  oedx: /abs/g, en: function(exp){
        var val = exp.match(/|(.+?)|/)[1];
        return 'absolute value of ' + val;
    }},

    {mask: /\(/g, en: ' round bracket opened '},
    {mask: /\)/g, en: ' round bracket closed '},



    {mask: /\^(\{.+?\})?/g, en: function(exp){
        return exp.replace(/\^\{?/, ' to the ').replace(/\}/, '') + ' power ';
    }},

    {mask:  /\d+ \d(-th|nd)/g, en: function(text){
      var numbers = text.replace('nd', '').match(/\d+/g);
      return '\\frac{' + numbers[0] + '}{' + numbers[1] + '}'}
    },

    {mask: /\^\{?2\}?/g, en: ' squared ', priority: 2},
    {mask: /\^\{?3\}?/g, en: 'cubed', priority: 2},
    {mask: /\^\{-1\}/g, en: ' inverse ', priority: 2},

    {mask: /_/g, en: ' sub '},
    {mask: /!/g, en: ' factorial '},

    {mask: /\\log/g, ascii_mask: /log/g,en: function(exp){
        return exp.replace('log ', ' the logarithm of ');
    }, priority: 1},

    {mask: /sqrt\{[^\{]+?\}/g, en: function(exp){
        var val = exp.match(/\{(.+?)\}/)[1];
        var text = exp.replace('\\sqrt', ' the square root of ');
        if(val.indexOf(' ') > -1)
            text = text.replace('{', '(').replace('}', ')');
        else
            text = text.replace('{', '').replace('}', '');
        return text;
    }, priority: 2},
    {mask: /\\sqrt/g,  oedx: /sqrt/g, en: function(exp){
        return exp.replace('\\sqrt', ' the square root of ');
    }, priority: 1},
    {mask: /\\sqrt\[3\]\{.+?\}/g, en: function(exp){
        return exp.replace(/\\sqrt[3]\{/, ' the cube root of ').replace(/\}$/, '');
    }, priority: 2},
    {mask: /\\sqrt\[.+?\]\{.+?\}/g, en: function(exp){
        var val = exp.match(/\\sqrt[(.+?)]/)[1];
        return exp.replace(/\\sqrt[.+?]\{/, 'the root of the power ' + val + ' of ').replace(/\}$/, '');
    }, priority: 2},
];


module.exports = SIGNS;
