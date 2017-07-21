/**
 * Created by Shayakhmetov on 21.09.2016.
 */
'use strict';

var RULES = [
    {mask: /\\lor/g, en: ' or ', ru: ' или '},
    {mask: /\\wedge/g, en: ' and ', ru: ' и ', priority: -1},
    {mask: /\\bar/g, en: ' not ', ru: ' не '},
    {mask: /\\Rightarrow/g, en: ' implies ', ru: ' подразумевает '},
    {mask: /\\sim/g, en: ' is equivalent to ', ru: ' эквивалентен '},
    {mask: /\\forall/g, en: ' for any ', ru: ' для всех '},
    {mask: /\\exists/g, en: ' there exists ', ru: ' существует '},
    {mask: /:/g, en: ' such that ', ru: ' такой что '}
];

module.exports = RULES;