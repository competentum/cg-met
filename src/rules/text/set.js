/**
 * Created by Shayakhmetov on 23.08.2016.
 */
'use strict';

var SETS = [
    {mask: /\\cup/g, en: ' union ', exp: 'uu'},

    {mask: /\\cap/g, en: 'intersection', exp: 'nn'},
    {mask: /intersection of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('intersection of ', '').replace('and', '\\cap');
    }, exp: function(text){
        return text.replace('intersection of ', '').replace('and', 'nn');
    }},
    {mask: /minus/g, en: '\\setminus', exp: '\\\\'},
    {mask: /set difference of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('set difference of ', '').replace('and', '\\setminus');
    }, exp: function(text){
        return text.replace('set difference of ', '').replace('and', '\\\\');
    }},
    {mask: /symmetric difference of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('symmetric difference of ', '').replace('and', '\\Delta');
    }, exp: function(text){
        return text.replace('symmetric difference of ', '').replace('and', 'Delta');
    }},
    {mask: /compliment of/g, en: '\\bar', exp: 'bar'},
    {mask: /closure of/g, en: '\\bar', exp: 'bar'},

    {mask: /belongs to/g, en: '\\in', exp: 'in'},
    {mask: /is an element of/g, en: '\\in', exp: 'in'},
    {mask: /[^\s]+? contains [^\s]+?/g, en: function(text){
        var params = text.split(' contains ');
        return params[1] + ' \\in ' + params[0];
    }, exp: function(text){
        var params = text.split(' contains ');
        return params[1] + ' in ' + params[0];
    }},
    {mask: /does not belong to/g, en: '\\notin', exp: '!in'},
    {mask: /is a subset of/g, en: '\\subset', exp: 'sub'},
    {mask: /is not a subset of/g, en: '\\subset', exp: 'sub'},
    {mask: /the empty set/g, en: '\\emptyset', exp: 'O/'},

    {mask: /the set of natural numbers/g, en: '\\mathbb{N}', exp: 'NN'},
    {mask: /the set of integer numbers/g, en: '\\mathbb{Z}', exp: 'ZZ'},
    {mask: /the set of rational numbers/g, en: '\\mathbb{Q}', exp: 'QQ'},
    {mask: /the set of real numbers/g, en: '\\mathbb{R}', exp: 'RR'},
    {mask: /the set of irrational numbers/g, en: '\\mathbb{R}\\setminus\\mathbb{Q}', exp: 'RR\\\\QQ'},
    {mask: /the set of algebraic numbers/g, en: '\\mathbb{A}', exp: 'bbb"A"'},
    {mask: /the set of transcendental numbers/g, en: '\\mathbb{R}\\setminus\\mathbb{A}', exp: 'RR\\\\bbb"A"'},
    {mask: /the n-dimensional real space/g, en: '\\mathbb{R}^\\varpropto', exp: 'RR^prop'},
    {mask: /the set of complex numbers/g, en: '\\mathbb{C}', exp: 'bbb"C"'},
    {mask: /the n-dimensional complex space/g, en: '\\mathbb{C}^\\varpropto', exp: 'bbb"C"^prop'},
    {mask: /the n-dimensional projective space/g, en: '\\mathbb{P}^\\varpropto', exp: 'bbb"P"^prop'},
    {mask: /the power ser of A/g, en: '2^A'},
    {mask: /boundary of/g, en: '2^A', exp: '2^A'},
    {mask: /the power ser of A/g, en: '2^A', exp: '2^A'},

    {mask: /cross/g, en: '\\times', exp: 'xx'},
    {mask: /direct product of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('direct product of ', '').replace('and', '\\times');
    }, exp: function(text){
        return text.replace('direct product of ', '').replace('and', 'xx');
    }},
    {mask: /cartesian product of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('cartesian product of ', '').replace('and', '\\times');
    }, exp: function(text){
        return text.replace('cartesian product of ', '').replace('and', 'xx');
    }},
    {mask: /plus/g, en: '\\oplus', exp: 'o+'},
    {mask: /direct sum of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('direct sum of ', '').replace('and', '\\oplus');
    }, exp: function(text){
        return text.replace('direct sum of ', '').replace('and', 'o+');
    }},
    {mask: /wedge/g, en: '\\wedge', exp: '^^'},
    {mask: /wedge product of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('wedge product of ', '').replace('and', '\\wedge');
    }, exp: function(text){
        return text.replace('wedge product of ', '').replace('and', '^^');
    }},
    {mask: /interior product of [^\s]+? and [^\s]+?/g, en: function(text){
        return text.replace('interior product of ', '').replace('and', '\\wedge');
    }, exp: function(text){
        return text.replace('interior product of ', '').replace('and', '^^');
    }},
    {mask: /quotient space [^\s]+? over [^\s]+?/g, en: function(text){
        return text.replace('quotient space ', '').replace('over', '/');
    }, exp: function(text){
        return text.replace('quotient space ', '').replace('over', '//');
    }},
    {mask: /factor space [^\s]+? over [^\s]+?/g, en: function(text){
        return text.replace('factor space ', '').replace('over', '/');
    }, exp: function(text){
        return text.replace('factor space ', '').replace('over', '//');
    }}
];

module.exports = SETS;
