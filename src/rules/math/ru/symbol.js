/**
 * Created by Shayakhmetov on 23.08.2016.
 */
'use strict';

var SIGNS = [
    {mask: /infinito/g, latex: '\\infty', exp: 'infty', priority: -1},
    {mask: /alfa/g, latex: '\\alpha', exp: 'alpha', priority: -1},
    {mask: /beta/g, latex: '\\beta', exp: 'beta', priority: -1},
    {mask: /chi/g, latex: '\\chi', exp: 'chi', priority: -1},
    {mask: /delta/g, latex: '\\delta', exp: 'delta', priority: -1},
    {mask: /epsilon/g, latex: '\\epsilon', exp: 'epsilon', priority: -1},
    {mask: /varepsilon/g, latex: '\\varepsilon', exp: 'varepsilon', priority: -1},
    {mask: /eta/g, latex: '\\eta', exp: 'eta', priority: -1},
    {mask: /gama/g, latex: '\\gamma', exp: 'gamma', priority: -1},
    {mask: /iota/g, latex: '\\iota', exp: 'iota', priority: -1},
    {mask: /kappa/g, latex: '\\kappa', exp: 'kappa', priority: -1},
    {mask: /lambda/g, latex: '\\lambda', exp: 'lambda', priority: -1},
    {mask: /mu/g, latex: '\\mu', exp: 'mu', priority: -1},
    {mask: /nu/g, latex: '\\nu', exp: 'nu', priority: -1},
    {mask: /omega/g, latex: '\\omega', exp: 'omega', priority: -1},
    {mask: /fi/g, latex: '\\phi', exp: 'phi', priority: -1},
    {mask: /varphi/g, latex: '\\varphi', exp: 'varphi', priority: -1},
    {mask: /pi/g, latex: '\\pi', exp: 'pi', priority: -1},
    {mask: /psi/g, latex: '\\psi', exp: 'psi', priority: -1},
    {mask: /rho/g, latex: '\\rho', exp: 'rho', priority: -1},
    {mask: /sigma/g, latex: '\\sigma', exp: 'sigma', priority: -1},
    {mask: /tau/g, latex: '\\tau', exp: 'tau', priority: -1},
    {mask: /teta/g, latex: '\\theta', exp: 'theta', priority: -1},
    {mask: /vartheta/g, latex: '\\vartheta', exp: 'vartheta', priority: -1},
    {mask: /upsilon/g, latex: '\\upsilon', exp: 'upsilon', priority: -1},
    {mask: /xi/g, latex: '\\xi', exp: 'xi', priority: -1},
    {mask: /zeta/g, latex: '\\zeta', exp: 'zeta', priority: -1}
];

module.exports = SIGNS;
