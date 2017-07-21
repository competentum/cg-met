/**
 * Created by Shayakhmetov on 23.08.2016.
 */
'use strict';

var SIGNS = [
    {mask: /\\infty/g, en: 'infinity', ru: 'бесконечности', priority: -1},
    {mask: /\\alpha/g, oedx: /alpha/g, en: 'alpha', ru: 'альфа', priority: -1},
    {mask: /\\beta/g, oedx: /beta/g, en: 'beta', ru: 'бета', priority: -1},
    {mask: /\\chi/g, oedx: /chi/g, en: 'chi', ru: 'чи', priority: -1},
    {mask: /\\delta/g, oedx: /delta/g, en: 'delta', ru: 'дельта', priority: -1},
    {mask: /\\epsilon/g, oedx: /epsilon/g, en: 'epsilon', ru: 'эпсилон', priority: -1},
    {mask: /\\varepsilon/g, oedx: /varepsilon/g, en: 'varepsilon', ru: 'эпсилон', priority: -1},
    {mask: /\\eta/g, en: 'eta', ru: 'эта', priority: -1},
    {mask: /\\gamma/g, oedx: /gamma/g, en: 'gamma', ru: 'гамма', priority: -1},
    {mask: /\\iota/g, oedx: /iota/g, en: 'iota', ru: 'йота', priority: -1},
    {mask: /\\kappa/g, oedx: /kappa/g, en: 'kappa', ru: 'каппа', priority: -1},
    {mask: /\\lambda/g, oedx: /lambda/g, en: 'lambda', ru: 'лямбда', priority: -1},
    {mask: /\\mu/g, oedx: /mu/g, en: 'mu', ru: 'мю', priority: -1},
    {mask: /\\nu/g, oedx: /nu/g, en: 'nu', ru: 'ню', priority: -1},
    {mask: /\\omega/g, en: 'omega', ru: 'омега', priority: -1},
    {mask: /\\phi/g, en: 'phi', ru: 'фи', priority: -1},
    {mask: /\\varphi/g, en: 'varphi', ru: 'фи', priority: -1},
    {mask: /\\pi/g, oedx: /pi/g,  en: 'pi', ru: 'пи', priority: -1},
    {mask: /\\psi/g, oedx: /psi/g, en: 'psi', ru: 'пси', priority: -1},
    {mask: /\\rho/g, oedx: /rho/g, en: 'rho', ru: 'ро', priority: -1},
    {mask: /\\sigma/g, oedx: /sigma/g, en: 'sigma', ru: 'сигма', priority: -1},
    {mask: /\\tau/g, oedx: /tau/g, en: 'tau', ru: 'тау', priority: -1},
    {mask: /\\theta/g, en: 'theta', ru: 'тета', priority: -1},
    {mask: /\\vartheta/g, en: 'vartheta', ru: 'тета', priority: -1},
    {mask: /\\upsilon/g, en: 'upsilon', ru: 'у', priority: -1},
    {mask: /\\xi/g, oedx: /xi/g, en: 'xi', ru: 'хи ', priority: -1},
    {mask: /\\zeta/g, en: 'zeta', ru: 'зета', priority: -1},
    {mask: /(\s|^)[A-Z](\s|$)/g, en: function(text){
        return ' cap ' + text.toLowerCase();
    }, ru: function(text){
        return text.toLowerCase() + ' большое ';
    }, priority: -10}
];

module.exports = SIGNS;
