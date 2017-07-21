'use strict';

var SIGNS = [

    {mask: /coma/g, latex: function(text){
      return text.replace('coma ', '.');
    }, priority: 2},
  {mask: / punto /g, latex: function(text){
      return text.replace(' punto ', '.');
    }},

    {mask: /más/g, latex: '+'},
    {mask: /plus/g, latex: '+'},
    {mask: /suma de .+? y [^\s]+/g, latex: function(text){
        return '(' + text.replace('suma de ', '').replace('y', '+') + ')';
    }},

    {mask: / menos /g, latex: '-', priority: 1},
    {mask: /(a )?positivo /g, latex: ''},
    {mask: /\s?negativo /g, latex: '-', priority: 1},
    {mask: /diferencia de .+? y [^\s]+/g, latex: function(text){
        return '(' + text.replace('diferencia de ', '').replace('y', '-') + ')';
    }},

    {mask: /mas menos/g, latex: '\\pm', priority: 2},

    {mask: /por/g, latex: '\\times', exp: 'times', priority: -1},
    {mask: /multiplicado por/g, latex: '\\times', exp: 'times'},
    {mask: /multiplicar/g, latex: '\\times', exp: 'times'},


    {mask: /producto  de .+? y [^\s]+/g, latex: function(text){
        return '(' + text.replace('producto  de ', '').replace('y', '\\times') + ')';
    }, exp: function(text){
        return '(' + text.replace('producto  de ', '').replace('y', 'times') + ')';
    }},
    {mask: /de dividir/g, latex: '/'},
    {mask: /al dividir/g, latex: '/'},
    {mask: /dividido (entre|por)/g, latex: '/', priority: 1},

    {mask: /son/g, latex: '='},


    {mask: /no es igual a/g, latex: '\\neq', exp: '!='},
    {mask: /es mayor que/g, latex: '\\gt', exp: '>'},
    {mask: /es menos que/g, latex: '\\lt', exp: '<'},
    {mask: /es mayor o igual a/g, latex: '\\geq', exp: '>='},
    {mask: /es menor o igual que/g, latex: '\\leq', exp: '<='},

    {mask: /valor absoluto de  [^\s]+/g, latex: function(text){
        return '|' + text.replace('valor absoluto de  ', '') + '|';
    }},
    {mask: /magnitud de [^\s]+/g, latex: function(text){
        return '|' + text.replace('magnitud de ', '') + '|';
    }},

    {mask: /paréntesis (de apertura|abierto) /g, latex: '('},
    {mask: /apertura de paréntesis /g, latex: '('},

    {mask: /paréntesis de cierre/g, latex: ')'},
    {mask: /(cierre de|cerrar) paréntesis/g, latex: ')'},

    {mask: /intervalo abierto de .+? a [^\s]+/g, latex: function(text){
        return '(' + text.replace('intervalo abierto de ', '').replace('a', ', ') + ')';
    }},
    {mask: /intervalo abierto de .+? hasta [^\s]+/g, latex: function(text){
      return '(' + text.replace('intervalo abierto de ', '').replace('hasta', ', ') + ')';
    }},


    {mask: /intervalo cerrado  de .+? a [^\s]+/g, latex: function(text){
      return '[' + text.replace('intervalo cerrado  de ', '').replace('a', ', ') + ']';
    }},

    {mask: /intervalo cerrado  de .+? - [^\s]+/g, latex: function(text){
      return '[' + text.replace('intervalo cerrado  de ', '').replace('-', ', ') + ']';
    }},

  {mask: /el cuadrado   /g, latex: '^2'},
  {mask: /el cubo /g, latex: '^3'},

  {mask: /sub /g, latex: '_'},
  {mask: /grado  /g, latex: '^'},
  {mask: /factorial/g, latex: '!'},


  {mask: /raiz/g, latex: '\\sqrt', priority: 2},



  {mask: /raiz cuadrada de [^\s]+/g, latex: function(text){
    return text.replace('raiz cuadrada de', '\\sqrt');
  }, exp: function(text){
    return text.replace('raiz cuadrada de', 'sqrt');
  }},

  {mask: /raiz cuadrada [^\s]+/g, latex: function(text){
    return text.replace('raiz cuadrada', '\\sqrt');
  }, exp: function(text){
    return text.replace('raiz cuadrada', 'sqrt');
  }},

  {mask: /raiz cubica de [^\s]+/g, latex: function(text){
    return text.replace('raiz cúbica de ', '\\sqrt');
  }, exp: function(text){
    return text.replace('raiz cúbica de ', 'root[3]');
  }, priority: 1},

  {mask: /elevado a la .+? potencia [^\s]+/g, latex: function(text){
    return text.replace('elevado a la ', '\\sqrt[').replace(' potencia ', ']');
  }, exp: function(text){
    return text.replace('elevado a la ', 'root[').replace(' potencia ', ']');
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
    }}
];


module.exports = SIGNS;
