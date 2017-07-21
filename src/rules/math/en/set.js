/**
 * Created by Shayakhmetov on 23.08.2016.
 */
'use strict';

var SETS = [
    {mask: /union/g, latex: '\\cup', exp: 'uu'},
    {mask: /union of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('union of ', '').replace('and', '\\cup');
    }, exp: function(text){
        return text.replace('union of ', '').replace('and', 'uu');
    }},
    {mask: /intersection/g, latex: '\\cap', exp: 'nn'},
    {mask: /intersection of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('intersection of ', '').replace('and', '\\cap');
    }, exp: function(text){
        return text.replace('intersection of ', '').replace('and', 'nn');
    }},
    {mask: /minus/g, latex: '\\setminus', exp: '\\\\'},
    {mask: /set difference of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('set difference of ', '').replace('and', '\\setminus');
    }, exp: function(text){
        return text.replace('set difference of ', '').replace('and', '\\\\');
    }},
    {mask: /symmetric difference of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('symmetric difference of ', '').replace('and', '\\Delta');
    }, exp: function(text){
        return text.replace('symmetric difference of ', '').replace('and', 'Delta');
    }},
    {mask: /compliment of/g, latex: '\\bar', exp: 'bar'},
    {mask: /closure of/g, latex: '\\bar', exp: 'bar'},

    {mask: /belongs to/g, latex: '\\in', exp: 'in'},
    {mask: /is an element of/g, latex: '\\in', exp: 'in'},
    {mask: /[^\s]+? contains [^\s]+?/g, latex: function(text){
        var params = text.split(' contains ');
        return params[1] + ' \\in ' + params[0];
    }, exp: function(text){
        var params = text.split(' contains ');
        return params[1] + ' in ' + params[0];
    }},
    {mask: /does not belong to/g, latex: '\\notin', exp: '!in'},
    {mask: /is a subset of/g, latex: '\\subset', exp: 'sub'},
    {mask: /is not a subset of/g, latex: '\\subset', exp: 'sub'},
    {mask: /the empty set/g, latex: '\\emptyset', exp: 'O/'},

    {mask: /the set of natural numbers/g, latex: '\\mathbb{N}', exp: 'NN'},
    {mask: /the set of integer numbers/g, latex: '\\mathbb{Z}', exp: 'ZZ'},
    {mask: /the set of rational numbers/g, latex: '\\mathbb{Q}', exp: 'QQ'},
    {mask: /the set of real numbers/g, latex: '\\mathbb{R}', exp: 'RR'},
    {mask: /the set of irrational numbers/g, latex: '\\mathbb{R}\\setminus\\mathbb{Q}', exp: 'RR\\\\QQ'},
    {mask: /the set of algebraic numbers/g, latex: '\\mathbb{A}', exp: 'bbb"A"'},
    {mask: /the set of transcendental numbers/g, latex: '\\mathbb{R}\\setminus\\mathbb{A}', exp: 'RR\\\\bbb"A"'},
    {mask: /the n-dimensional real space/g, latex: '\\mathbb{R}^\\varpropto', exp: 'RR^prop'},
    {mask: /the set of complex numbers/g, latex: '\\mathbb{C}', exp: 'bbb"C"'},
    {mask: /the n-dimensional complex space/g, latex: '\\mathbb{C}^\\varpropto', exp: 'bbb"C"^prop'},
    {mask: /the n-dimensional projective space/g, latex: '\\mathbb{P}^\\varpropto', exp: 'bbb"P"^prop'},
    {mask: /the power ser of A/g, latex: '2^A'},
    {mask: /boundary of/g, latex: '2^A', exp: '2^A'},
    {mask: /the power ser of A/g, latex: '2^A', exp: '2^A'},

    {mask: /cross/g, latex: '\\times', exp: 'xx'},
    {mask: /direct product of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('direct product of ', '').replace('and', '\\times');
    }, exp: function(text){
        return text.replace('direct product of ', '').replace('and', 'xx');
    }},
    {mask: /cartesian product of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('cartesian product of ', '').replace('and', '\\times');
    }, exp: function(text){
        return text.replace('cartesian product of ', '').replace('and', 'xx');
    }},
    {mask: /plus/g, latex: '\\oplus', exp: 'o+'},
    {mask: /direct sum of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('direct sum of ', '').replace('and', '\\oplus');
    }, exp: function(text){
        return text.replace('direct sum of ', '').replace('and', 'o+');
    }},
    {mask: /wedge/g, latex: '\\wedge', exp: '^^'},
    {mask: /wedge product of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('wedge product of ', '').replace('and', '\\wedge');
    }, exp: function(text){
        return text.replace('wedge product of ', '').replace('and', '^^');
    }},
    {mask: /interior product of [^\s]+? and [^\s]+?/g, latex: function(text){
        return text.replace('interior product of ', '').replace('and', '\\wedge');
    }, exp: function(text){
        return text.replace('interior product of ', '').replace('and', '^^');
    }},
    {mask: /quotient space [^\s]+? over [^\s]+?/g, latex: function(text){
        return text.replace('quotient space ', '').replace('over', '/');
    }, exp: function(text){
        return text.replace('quotient space ', '').replace('over', '//');
    }},
    {mask: /factor space [^\s]+? over [^\s]+?/g, latex: function(text){
        return text.replace('factor space ', '').replace('over', '/');
    }, exp: function(text){
        return text.replace('factor space ', '').replace('over', '//');
    }}
];

module.exports = SETS;
