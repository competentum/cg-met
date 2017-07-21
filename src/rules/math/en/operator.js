'use strict';

var SIGNS = [
    {mask: / point /g, latex: '.', priority: 1},

    {mask: /\D point \d/g, latex: function(text){
      return text.replace('point ', '0.');
    }, priority: 2},

    {mask: /[^\s]+ (plus|minus|times|over|divided by|by) .+ quantity/g, latex: function(text){
        return '(' + text.replace(' quantity', ')');
    }},

    {mask: /plus/g, latex: '+'},
    {mask: /sum of .+? and [^\s]+/g, latex: function(text){
        return '(' + text.replace('sum of ', '').replace('and', '+') + ')';
    }},

    {mask: /\s?minus /g, latex: '-', priority: 1},
    {mask: /(a )?positive /g, latex: ''},
    {mask: /\s?negative /g, latex: '-', priority: 1},
    {mask: /difference of .+? and [^\s]+/g, latex: function(text){
        return '(' + text.replace('difference of ', '').replace('and', '-') + ')';
    }},

    {mask: /plus minus/g, latex: '\\pm', priority: 2},

    {mask: /multiplied by/g, latex: '\\times', exp: '*'},
    {mask: /times/g, latex: '\\times', exp: '*'},
    {mask: /multiplication of .+? and [^\s]+/g, latex: function(text){
        return '(' + text.replace('multiplication of ', '').replace('and', '\\times') + ')';
    }, exp: function(text){
        return '(' + text.replace('multiplication of ', '').replace('and', '*') + ')';
    }},
    {mask: /product of .+? and [^\s]+/g, latex: function(text){
        return '(' + text.replace('product of ', '').replace('and', '\\times') + ')';
    }, exp: function(text){
        return '(' + text.replace('product of ', '').replace('and', '*') + ')';
    }},
    {mask: /multiplication/g, latex: '\\times', exp: '*', priority: 0},

    {mask: /divided by/g, latex: '/'},
    {mask: / by /g, latex: '/', priority: -1},
    {mask: /over/g, latex: '/'},
    {mask: /ratio of [^\s]+ and [^\s]+/g, latex: function(text){
        return '(' + text.replace('ratio of ', '').replace('and', '/') + ')';
    }},

    {mask: /equals/g, latex: '='},
    {mask: /is equal to/g, latex: '='},
    {mask: /is approximately equal to/g, latex: '\\approx', exp: '~~'},
    {mask: /the identity sign/g, latex: '\\dashv', exp: '-='},
    {mask: /is identically equal to/g, latex: '\\dashv', exp: '-='},
    {mask: /is not equal to/g, latex: '\\neq', exp: '!='},
    {mask: /is greater than/g, latex: '\\gt', exp: '>'},
    {mask: /is less than/g, latex: '\\lt', exp: '<'},
    {mask: /is greater than or equal to/g, latex: '\\geq', exp: '>='},
    {mask: /is less than or equal to/g, latex: '\\leq', exp: '<='},

    {mask: /absolute value of [^\s]+/g, latex: function(text){
        return '|' + text.replace('absolute value of ', '') + '|';
    }},
    {mask: /magnitude of [^\s]+/g, latex: function(text){
        return '|' + text.replace('magnitude of ', '') + '|';
    }},

  {mask: /left parenthesis/g, latex: '('},
  {mask: /right parenthesis/g, latex: ')'},

  //{mask: /(round )?bracket(s)? open(ed|ing)?/g, latex: '('},
  //{mask: /(round )?bracket(s)? clos(e|ed|ing)?/g, latex: ')'},

  {mask: /open(ed|ing)? (round )?bracket(s)?/g, latex: '('},
  {mask: /clos(e|ed|ing)? (round )?bracket(s)?/g, latex: ')'},

    {mask: /open parenthesis/g, latex: '('},
    {mask: /close parenthesis/g, latex: ')'},

    //hot fix
    {mask: /open parentheses/g, latex: '('},
    {mask: /close parentheses/g, latex: ')'},
    {mask: /left parentheses/g, latex: '('},
    {mask: /right parentheses/g, latex: ')'},

    {mask: /open interval from .+? to [^\s]+/g, latex: function(text){
        return '(' + text.replace('open interval from ', '').replace('to', ', ') + ')';
    }},
    {mask: /closed interval from .+? to [^\s]+/g, latex: function(text){
        return '[' + text.replace('closed interval from ', '').replace('to', ', ') + ']';
    }},
    {mask: /open from the left interval from .+? to [^\s]+/g, latex: function(text){
        return '(' + text.replace('open from the left interval from ', '').replace('to', ', ') + ']';
    }},
    {mask: /closed from the right interval from .+? to [^\s]+/g, latex: function(text){
        return '(' + text.replace('closed from the right interval from ', '').replace('to', ', ') + ']';
    }},
    {mask: /open from the right interval from .+? to [^\s]+/g, latex: function(text){
        return '[' + text.replace('open from the right interval from ', '').replace('to', ', ') + ')';
    }},
    {mask: /closed from the left interval from .+? to [^\s]+/g, latex: function(text){
        return '[' + text.replace('closed from the left interval from ', '').replace('to', ', ') + ')';
    }},

    {mask: / raised to the [^\s]+ power/g, latex: function(text){
        return '^{' + text.replace(' raised to the ', '').replace(' power', '').replace('-th', '') + '}';
    }},
    {mask: / x-rays of to the [^\s]+ power/g, latex: function(text){
        return '^{' + text.replace(' x-rays of to the ', '').replace(' power', '').replace('-th', '') + '}';
    }},
    {mask: /the [^\s]+ power of [^\s]+/g, latex: function(text){
        var params = text.split(/the | power of /);
        return params[2] + '^' + params[1].replace('-th', '');
    }},
    {mask: / to the [^\s]+ power/g, latex: function(text){
        return '^{' + text.replace(' to the ', '').replace(' power', '').replace('-th', '') + '}';
    }},
    {mask: / to the power of [^\s]+/g, latex: function(text){
        return '^' + text.replace(' to the power of ', '{').replace('-th', '') + '}';
    }},
    {mask: / to the [^\s]+/g, latex: function(text){
        return '^' + text.replace(' to the ', '{').replace('-th', '') + '}';
    }},
    {mask: / to [^\s]+/g, latex: function(text){
        return '^' + text.replace(' to ', '{').replace('-th', '') + '}';
    }},
    {mask:  /\d+ \d(-th|nd)/g, latex: function(text){
      var numbers = text.replace('nd', '').match(/\d+/g);
      return '\\frac{' + numbers[0] + '}{' + numbers[1] + '}'}
    },
    {mask: / [^\s]+-th/g, latex: function(text){
        return '_{' + text.replace('-th', '') + '}';
    }},
    {mask: /the square of [^\s]+/g, latex: function(text){
        return text.replace('the square of ', '') + '^2';
    }},
    {mask: /squared/g, latex: '^2'},
    {mask: /cubed/g, latex: '^3'},

    {mask: / sub /g, latex: '_'},
    {mask: / to /g, latex: '^', priority: -1},
    {mask: / super /g, latex: '^'},
    {mask: / factorial/g, latex: '!'},


    {mask: / inverse/g, latex: function(text){
        return text.replace(' inverse', '^{-1}');
    }},
    {mask: /the square root of [^\s]+/g, latex: function(text){
        return text.replace('square root of', '\\sqrt');
    }, exp: function(text){
        return text.replace('square root of', 'sqrt(') + ')';
    }, priority: 1},
    {mask: /square root of [^\s]+/g, latex: function(text){
        return text.replace('square root of', '\\sqrt');
    }, exp: function(text){
        return text.replace('square root of', 'sqrt(') + ')';
    }},
    {mask: /the cube root of [^\s]+/g, latex: function(text){
        return text.replace('square root of ', '\\sqrt');
    }, exp: function(text){
        return text.replace('square root of ', 'root[3]');
    }, priority: 1},
    {mask: /cube root of [^\s]+/g, latex: function(text){
        return text.replace('square root of ', '\\sqrt');
    }, exp: function(text){
        return text.replace('square root of ', 'root[3]');
    }},
    {mask: /the root of the power .+? of [^\s]+/g, latex: function(text){
        return text.replace('the root of the power ', '\\sqrt[').replace(' of ', ']');
    }, exp: function(text){
        return text.replace('the root of the power ', 'root[').replace(' of ', ']');
    }}
];


module.exports = SIGNS;
