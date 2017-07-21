
'use strict';

var SIGNS = [
  {mask: /[a-z] \d/g, latex: function(text){
    return text.replace(' ', '_{') + '}';
  }, exp: function(text){
      return text.replace(' ', '');
  }},
  {mask: /[A-Z] \d/g, latex: function(text){
      return text.replace(' ', '_{') + '}';
  }, exp: function(text){
      return text.replace(' ', '');
  }},

  {mask: /\d [a-z]/g, latex: function(text){
    return text.replace(' ', '')}},
  {mask: /\d [A-Z]/g, latex: function(text){
    return text.replace(' ', '');
  }},

  {mask: /[a-z] [A-Z]/g, latex: function(text){
    return text.replace(' ', '');
  }},

  {mask: /} [A-Z]/g, latex: function(text){
    return text.replace(' ', '');
  }}

];

module.exports = SIGNS;