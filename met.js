(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MET"] = factory();
	else
		root["MET"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by 96664_000 on 16.08.2016.
	 */
	'use strict';
	
	var merge = __webpack_require__(2);
	var processing = __webpack_require__(4);
	var asciiMath = __webpack_require__(57);
	
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * @name JavaScript/NodeJS Merge v1.2.0
	 * @author yeikos
	 * @repository https://github.com/yeikos/js.merge
	
	 * Copyright 2014 yeikos - MIT license
	 * https://raw.github.com/yeikos/js.merge/master/LICENSE
	 */
	
	;(function(isNode) {
	
		/**
		 * Merge one or more objects 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */
	
		var Public = function(clone) {
	
			return merge(clone === true, false, arguments);
	
		}, publicName = 'merge';
	
		/**
		 * Merge two or more objects recursively 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */
	
		Public.recursive = function(clone) {
	
			return merge(clone === true, true, arguments);
	
		};
	
		/**
		 * Clone the input removing any reference
		 * @param mixed input
		 * @return mixed
		 */
	
		Public.clone = function(input) {
	
			var output = input,
				type = typeOf(input),
				index, size;
	
			if (type === 'array') {
	
				output = [];
				size = input.length;
	
				for (index=0;index<size;++index)
	
					output[index] = Public.clone(input[index]);
	
			} else if (type === 'object') {
	
				output = {};
	
				for (index in input)
	
					output[index] = Public.clone(input[index]);
	
			}
	
			return output;
	
		};
	
		/**
		 * Merge two objects recursively
		 * @param mixed input
		 * @param mixed extend
		 * @return mixed
		 */
	
		function merge_recursive(base, extend) {
	
			if (typeOf(base) !== 'object')
	
				return extend;
	
			for (var key in extend) {
	
				if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
	
					base[key] = merge_recursive(base[key], extend[key]);
	
				} else {
	
					base[key] = extend[key];
	
				}
	
			}
	
			return base;
	
		}
	
		/**
		 * Merge two or more objects
		 * @param bool clone
		 * @param bool recursive
		 * @param array argv
		 * @return object
		 */
	
		function merge(clone, recursive, argv) {
	
			var result = argv[0],
				size = argv.length;
	
			if (clone || typeOf(result) !== 'object')
	
				result = {};
	
			for (var index=0;index<size;++index) {
	
				var item = argv[index],
	
					type = typeOf(item);
	
				if (type !== 'object') continue;
	
				for (var key in item) {
	
					var sitem = clone ? Public.clone(item[key]) : item[key];
	
					if (recursive) {
	
						result[key] = merge_recursive(result[key], sitem);
	
					} else {
	
						result[key] = sitem;
	
					}
	
				}
	
			}
	
			return result;
	
		}
	
		/**
		 * Get type of variable
		 * @param mixed input
		 * @return string
		 *
		 * @see http://jsperf.com/typeofvar
		 */
	
		function typeOf(input) {
	
			return ({}).toString.call(input).slice(8, -1).toLowerCase();
	
		}
	
		if (isNode) {
	
			module.exports = Public;
	
		} else {
	
			window[publicName] = Public;
	
		}
	
	})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Shayakhmetov on 05.12.2016.
	 */
	
	var MATH = {
	    en: __webpack_require__(5),
	    es: __webpack_require__(25),
	    ru: __webpack_require__(33)
	};
	var TEXT = __webpack_require__(40);
	
	module.exports = function(text, settings){
	    var result;
	    switch(settings.output){
	        case 'text':
	            result = TEXT(text, settings);
	            break;
	        case 'text_openEdx':
	            result = TEXT(text, settings);
	            break;
	        default:
	            result = MATH[settings.lang](text, settings);
	    }
	    return result.trim().replace(/\s{2,}/, ' ');
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Created by Shayakhmetov on 23.08.2016.
	 */
	
	'use strict';
	
	var numbersProcessing = __webpack_require__(7);
	var symbols = __webpack_require__(8);
	var operators = __webpack_require__(9);
	var fractions = __webpack_require__(10);
	var sets = __webpack_require__(11);
	var logic = __webpack_require__(12);
	var calculus = __webpack_require__(13);
	var chemistry = __webpack_require__(20);
	var postprocessing = __webpack_require__(24);
	
	module.exports = function(text, options){
	    var exp;
	    switch(options.type){
	        case 'algebra':
	            var masks = [].concat(fractions, symbols, operators, calculus);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            break;
	        case 'set':
	            var masks = [].concat(fractions, sets);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            break;
	        case 'logic':
	            var masks = [].concat(fractions, logic, sets, operators);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            break;
	      case 'chem':
	            var masks = [].concat(chemistry);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            console.log('==================='+exp+'==================')
	            break;
	    };
	    return postprocessing(exp);
	};
	
	function process(text, masks, output){
	    var resultStr = text;
	    masks.forEach(function(sign){
	        var format = (output in sign)? output : 'latex';
	        resultStr = resultStr.replace(sign.mask, sign[format]);
	    });
	    return resultStr;
	}
	
	function compare(a,b){
	    if(!('priority' in a))
	        a.priority = 0;
	    if(!('priority' in b))
	        b.priority = 0;
	    if(a.priority < b.priority)
	        return 1;
	    if(a.priority > b.priority)
	        return -1;
	    return 0;
	}
	/*
	function numbersProcessing(text){
	    return text;
	}*/
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Created by 96664_000 on 16.08.2016.
	 */
	'use strict';
	
	var small = {
	        'zero': 0,
	        'one': 1,
	        'two': 2,
	        'three': 3,
	        'four': 4,
	        'five': 5,
	        'six': 6,
	        'seven': 7,
	        'eight': 8,
	        'nine': 9,
	        'ten': 10,
	        'eleven': 11,
	        'twelve': 12,
	        'thirteen': 13,
	        'fourteen': 14,
	        'fifteen': 15,
	        'sixteen': 16,
	        'seventeen': 17,
	        'eighteen': 18,
	        'nineteen': 19
	    },
	    average = {
	        'twenty': 20,
	        'thirty': 30,
	        'forty': 40,
	        'fifty': 50,
	        'sixty': 60,
	        'seventy': 70,
	        'eighty': 80,
	        'ninety': 90
	    },
	    magnitudes = [
	        {text: 'hundred', order: 2},
	        {text: 'thousand', order: 3},
	        {text: 'million', order: 6},
	        {text: 'billion', order: 9},
	        {text: 'trillion', order: 12},
	        {text: 'quadrillion', order: 15},
	        {text: 'quintillion', order: 18},
	        {text: 'sextillion', order: 21},
	        {text: 'septillion', order: 24},
	        {text: 'octillion', order: 27},
	        {text: 'nonillion', order: 30},
	        {text: 'decillion', order: 33}
	    ],
	    ordinal = {
	    'naught': 0,
	    'first': 1,
	    'second': 2,
	    'third': 3,
	    'fourth': 4,
	    'fifth': 5,
	    'sixth': 6,
	    'seventh': 7,
	    'eighth': 8,
	    'ninth': 9,
	    'tenth': 10,
	    'eleventh': 11,
	    'twelfth': 12,
	    'thirteenth': 13,
	    'fourteenth': 14,
	    'fifteenth': 15,
	    'sixteenth': 16,
	    'seventeenth': 17,
	    'eighteenth': 18,
	    'nineteenth': 19,
	    'twentieth': 20,
	    'thirtieth': 30,
	    'fortieth': 40,
	    'fiftieth': 50,
	    'sixtieth': 60,
	    'seventieth': 70,
	    'eightieth': 80,
	    'ninetieth': 90,
	    'hundredth': 100,
	    'thousandth': 1000,
	    'millionth': 1000000,
	    'billionth': 1000000000,
	    'trillionth': 1000000000000,
	    'quadrillionth': 1000000000000000,
	    'quintillionth': 1000000000000000000,
	    'sextillionth': 1000000000000000000000,
	    'septillionth': 1000000000000000000000000,
	    'octillionth': 1000000000000000000000000000,
	    'nonillionth': 1000000000000000000000000000000,
	    'decillionth': 1000000000000000000000000000000000
	};
	    module.exports = process;
	
	
	function process(text){
	    /*for(var number in small){
	     while(arr.indexOf(number) > -1){
	     var index = arr.indexOf(number);
	     arr[index] = small[number];
	     }
	     }*/
	    var resultArr = text.replace(/oneplus/g, 'one plus').split(/\s+/);
	    var resultArr = resultArr.map(function(el, index){
	        if(el in small)
	            return small[el].toString();
	        if(el in ordinal)
	            return ordinal[el].toString() + '-th';
	        if(el in average){
	            if(index < resultArr.length - 1)
	                if(resultArr[index + 1] in small) {
	                    var nextVal = resultArr[index + 1];
	                    resultArr[index + 1] = '';
	                    return (average[el] / 10).toString() + small[nextVal].toString();
	                }
	            return average[el].toString();
	        }
	        return el;
	    });
	    magnitudes.forEach(function(magnitude){
	        while(resultArr.indexOf(magnitude.text) > -1){
	            var index = resultArr.indexOf(magnitude.text);
	            var currIndex = index + 1;
	            var order = 0;
	            resultArr[index] = '';
	            while ((currIndex < resultArr.length)&&(!isNaN(resultArr[currIndex]) || !isNaN(resultArr[currIndex].replace('-th', '')))) {
	                order += resultArr[currIndex].replace('-th', '').length;
	                resultArr[index] += resultArr[currIndex];
	                resultArr[currIndex] = '';
	                currIndex++;
	            }
	            if(!isNaN(resultArr[index - 1])) {
	                resultArr[index - 1] += zeros(magnitude.order - order) + resultArr[index];
	                resultArr[index] = '';
	            }
	            else
	                resultArr[index] = Math.pow(10, (magnitude.order - order > 0)? (magnitude.order - order) : 0).toString() + resultArr[index];
	        }
	    });
	    return resultArr.filter(function(v){return v!==''}).join(' ');
	}
	function zeros(n){
	    var resultStr = '';
	    if(n > 0)
	        for(var i = 0; i < n; i++){
	            resultStr += '0';
	        }
	    return resultStr;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 23.08.2016.
	 */
	'use strict';
	
	var SIGNS = [
	    {mask: /infinity/g, latex: '\\infty', exp: 'infty', priority: -1},
	    {mask: /alpha/g, latex: '\\alpha', exp: 'alpha', priority: -1},
	    {mask: /beta/g, latex: '\\beta', exp: 'beta', priority: -1},
	    {mask: /chi/g, latex: '\\chi', exp: 'chi', priority: -1},
	    {mask: /delta/g, latex: '\\delta', exp: 'delta', priority: -1},
	    {mask: /epsilon/g, latex: '\\epsilon', exp: 'epsilon', priority: -1},
	    {mask: /varepsilon/g, latex: '\\varepsilon', exp: 'varepsilon', priority: -1},
	    {mask: /eta/g, latex: '\\eta', exp: 'eta', priority: -1},
	    {mask: /gamma/g, latex: '\\gamma', exp: 'gamma', priority: -1},
	    {mask: /iota/g, latex: '\\iota', exp: 'iota', priority: -1},
	    {mask: /kappa/g, latex: '\\kappa', exp: 'kappa', priority: -1},
	    {mask: /lambda/g, latex: '\\lambda', exp: 'lambda', priority: -1},
	    {mask: /mu/g, latex: '\\mu', exp: 'mu', priority: -1},
	    {mask: /nu/g, latex: '\\nu', exp: 'nu', priority: -1},
	    {mask: /omega/g, latex: '\\omega', exp: 'omega', priority: -1},
	    {mask: /phi/g, latex: '\\phi', exp: 'phi', priority: -1},
	    {mask: /varphi/g, latex: '\\varphi', exp: 'varphi', priority: -1},
	    {mask: /pi/g, latex: '\\pi', exp: 'pi', priority: -1},
	    {mask: /psi/g, latex: '\\psi', exp: 'psi', priority: -1},
	    {mask: /rho/g, latex: '\\rho', exp: 'rho', priority: -1},
	    {mask: /sigma/g, latex: '\\sigma', exp: 'sigma', priority: -1},
	    {mask: /tau/g, latex: '\\tau', exp: 'tau', priority: -1},
	    {mask: /theta/g, latex: '\\theta', exp: 'theta', priority: -1},
	    {mask: /vartheta/g, latex: '\\vartheta', exp: 'vartheta', priority: -1},
	    {mask: /upsilon/g, latex: '\\upsilon', exp: 'upsilon', priority: -1},
	    {mask: /xi/g, latex: '\\xi', exp: 'xi', priority: -1},
	    {mask: /zeta/g, latex: '\\zeta', exp: 'zeta', priority: -1}
	];
	
	module.exports = SIGNS;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 02.11.2016.
	 */
	'use strict';
	
	var SIGNS = [
	    {mask: /the one half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 2},
	    {mask: /and 1 half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /1 half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /and a half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 0}
	
	];
	
	
	module.exports = SIGNS;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

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


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 21.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: / or /g, latex: '\\lor', exp: 'vv'},
	    {mask: / and /g, latex: '\\wedge', exp: '^^', priority: -1},
	    {mask: / not /g, latex: '\\bar', exp: 'bar'},
	    {mask: / implies /g, latex: '\\Rightarrow', exp: 'rArr'},
	    {mask: / is equivalent to /g, latex: '\\sim', exp: '~'},
	    {mask: /for any/g, latex: '\\forall', exp: 'AA'},
	    {mask: /for all/g, latex: '\\forall', exp: 'AA'},
	    {mask: /there exists/g, latex: '\\exists', exp: 'EE'},
	    {mask: /such that/g, latex: ':'},
	    {mask: /real [^\s]+/g, latex: function(text){
	        return text.replace('real ', '') + '\\in\\mathbb{R}';
	    }, exp: function(text){
	        return text.replace('real ', '') + 'in RR';
	    }},
	    {mask: /integer [^\s]+/g, latex: function(text){
	        return text.replace('integer ', '') + '\\in\\mathbb{N}';
	    }, exp: function(text){
	        return text.replace('integer ', '') + 'in NN';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	
	var derivatives = __webpack_require__(14);
	var functions = __webpack_require__(15);
	var integral = __webpack_require__(16);
	var limit = __webpack_require__(17);
	var series = __webpack_require__(18);
	var term = __webpack_require__(19);
	
	
	module.exports = [].concat(derivatives, functions, integral, limit, series, term);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /d 2 [^\s]+ by d [^\s]+ squared/g, latex: function(text){
	        var params = text.replace('by d ', '').replace(' squared', '').replace(/^d 2 /, '').split(' ');
	        return '\\frac{d^2 ' + params[0] + '}{d ' + params[1] + '^2}';
	    }, exp: function(text){
	        var params = text.replace('by d ', '').replace(/^d /, '');
	        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }, priority: 1},
	    {mask: /\d+?-th derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
	        var params = text.replace('-th derivative of ', ' ').replace('with respect to ', '').split(' ');
	        return '\\frac{d^' + params[0] + ' ' + params[1] + '}{d ' + params[2] + '^' + params[0] + '}';
	    }, exp: function(text){
	        var params = text.replace('-th derivative of ', '').replace('with respect to ', '').split(' ');
	        return '\\frac{d^' + params[0] + ' ' + params[1] + '}{d ' + params[2] + '^' + params[0] + '}';
	    }, priority: 1},
	
	    {mask: /partial d [^\s]+ by d [^\s]+/g, latex: function(text){
	        var params = text.replace('by d ', '').replace('partial d ', '').split(' ');
	        return '\\frac{\\partial ' + params[0] + '}{\\partial ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('by d ', '').replace('partial d ', '').split(' ');
	        return 'frac{del ' + params[0] + '}{del ' + params[1] + '}';
	    }, priority: 1},
	    {mask: /\d+?-th partial derivative of [^\s]+ with respect to [^\s]+ and [^\s]+/g, latex: function(text){
	        var params = text.replace('-th partial derivative of ', ' ').replace('with respect to ', '').replace('and ', '').split(' ');
	        return '\\frac{\\partial ^' + params[0] + ' ' + params[1] + '}{\\partial ' + params[2] + '\\partial ' + params[3] + '}';
	    }, exp: function(text){
	        var params = text.replace('-th partial derivative of ', ' ').replace('with respect to ', '').replace('and ', '').split(' ');
	        return 'frac{del ^' + params[0] + ' ' + params[1] + '}{del ' + params[2] + 'del ' + params[3] + '}';
	    }},
	    {mask: /partial derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
	        var params = text.replace('partial derivative of ', '').replace('with respect to ', '').split(' ');
	        return '\\frac{\\partial ' + params[0] + '}{\\partial ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('partial derivative of ', '').replace('with respect to ', '').split(' ');
	        return 'frac{del ' + params[0] + '}{del ' + params[1] + '}';
	    }},
	
	    {mask: /d [^\s]+ by d [^\s]+/g, latex: function(text){
	        var params = text.replace('by d ', '').replace(/^d /, '').split(' ');
	        return '\\frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('by d ', '').replace(/^d /, '').split(' ');
	        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }},
	    {mask: /derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
	        var params = text.replace('derivative of ', '').replace('with respect to ', '').split(' ');
	        return '\\frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('derivative of ', '').replace('with respect to ', '').split(' ');
	        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }},
	
	    {mask: /differential of/g, latex: 'd'},
	    {mask: /double prime/g, latex: '\\prime\\prime', exp: "''"},
	    {mask: /second derivative of [^\s]+/g, latex: function(text){
	        return text.replace('second derivative of ', '') + '\\prime\\prime';
	    }, exp: function(text){
	        return text.replace('second derivative of ', '') + "''";
	    }},
	    {mask: /triple prime/g, latex: '\\prime\\prime\\prime', exp: "'''"},
	    {mask: /third derivative of [^\s]+/g, latex: function(text){
	        return text.replace('third derivative of ', '') + '\\prime\\prime\\prime';
	    }, exp: function(text){
	        return text.replace('third derivative of ', '') + "'''";
	    }},
	    {mask: /prime/g, latex: '\\prime', exp: "'"},
	    {mask: /derivative of .+? of the order [^\s]+/g, latex: function(text){
	        return text.replace('derivative of ', '').replace(' of the order ', '^');
	    }},
	    {mask: /derivative of [^\s]+/g, latex: function(text){
	        return text.replace('derivative of ', '') + '\\prime';
	    }, exp: function(text){
	        return text.replace('derivative of ', '') + "'";
	    }},
	    {mask: /[^\s]+-th derivative of [^\s]+/g, latex: function(text){
	        var order = text.substring(0, text.indexOf('-th derivative of'));
	        var func = text.substring(text.lastIndexOf('-th derivative of')).replace('-th derivative of', '');
	        return func + '^{(' + order + ')}';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: / of [^\s]+/g, latex: function(text){
	        return text.replace(' of ', '(') + ')';
	    }, priority: '-1'},
	    {mask: / is a function of [^\s]+/g, latex: function(text){
	        return text.replace(' is a function of ', '(') + ')';
	    }, priority: '-1'},
	    {mask: /domain of the function /g, latex: 'D_'},
	    {mask: /range of the function /g, latex: 'R_'},
	    {mask: /composition of the functions [^\s]+ and [^\s]+/g, latex: function(text){
	        return text.replace('composition of the functions ', '').replace(' and ', '\\circ');
	    }, exp: function(text){
	        return text.replace('composition of the functions ', '').replace(' and ', '@');
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /double integral (from .+? to [^\s]+)?/g, latex: function(text){
	        return text.replace('double integral ', '\\iint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }, exp: function(text){
	        return text.replace('double integral ', 'intint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /triple integral (from .+? to [^\s]+)?/g, latex: function(text){
	        return text.replace('triple integral ', '\\iiint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }, exp: function(text){
	        return text.replace('triple integral ', 'intintint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /integral (from .+? to [^\s]+)?/g, latex: function(text){
	        var close = (text.indexOf('from') > -1)? '}' : '';
	        return text.replace('integral ', '\\int').replace('from ', '_{').replace(' to ', '}^{') + close;
	    }, exp: function(text){
	        var close = (text.indexOf('from') > -1)? '}' : '';
	        return text.replace('integral ', 'int').replace('from ', '_{').replace(' to ', '}^{') + close;
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	/*var tmplStr = require('../../tmplStr');*/
	
	var RULES = [
	    {mask: /limit of [^\s]+ [^\s]+ as [^\s]+ tends to [^\s]+/g, latex: function(text){
	        var params = text.replace('limit of ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return /*tmplStr(params, '\\lim_{${2}\\to${3}}${0}_${1}');*/'\\lim_{' + params[2] + '\\to' + params[3] + '}' + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('limit of ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return 'lim_{' + params[2] + 'to' + params[3] + '}' + params[0] + '_' + params[1];
	    }},
	    {mask: /[^\s]+ [^\s]+ converges to [^\s]+ as [^\s]+ tends to [^\s]+/g, latex: function(text){
	        var params = text.replace('converges to ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return '\\lim_{' + params[3] + ' \\to ' + params[4] + '}' + params[0] + '_' + params[1] + '=' + params[2];
	    }, exp: function(text){
	        var params = text.replace('converges to ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return 'lim_{' + params[3] + ' to ' + params[4] + '}' + params[0] + '_' + params[1] + '=' + params[2];
	    }},
	    {mask: /[^\s]+ from the (left|right)/g, latex: function(text){
	        return '{' + text.replace('from the ', '').replace(' left', '-0').replace(' right', '+0') + '}';
	    }},
	    {mask: /limit of [^\s]+ of [^\s]+ as [^\s]+ approaches [^\s]+/g, latex: function(text){
	        var params = text.replace('limit of ', '').replace('of ', '').replace('as ', '').replace('approaches ', '').replace('from the ', '').split(' ');
	        return '\\lim_{' + params[2] + ' \\to ' + params[3] + '}' + params[0] + '(' + params[1] + ')';
	    }, exp: function(text){
	        var params = text.replace('limit of ', '').replace('of ', '').replace('as ', '').replace('approaches ', '').replace('from the ', '').split(' ');
	        return 'lim_{' + params[2] + ' to ' + params[3] + '}' + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: / and /g, latex: '\\wedge', exp: '^^'},
	    {mask: / not /g, latex: '\\bar', exp: 'bar'},
	    {mask: / implies /g, latex: '\\Rightarrow', exp: 'rArr'},
	    {mask: / is equivalent to /g, latex: '\\sim', exp: '~'},
	    {mask: /for any/g, latex: '\\forall', exp: 'AA'},
	    {mask: /for all/g, latex: '\\forall', exp: 'AA'},
	    {mask: /there exists/g, latex: '\\exists', exp: 'EE'},
	    {mask: /such that/g, latex: ':'},
	    {mask: /real [^\s]+/g, latex: function(text){
	        return text.replace('real ', '') + '\\in\\mathbb{R}';
	    }, exp: function(text){
	        return text.replace('real ', '') + 'in RR';
	    }},
	    {mask: /integer [^\s]+/g, latex: function(text){
	        return text.replace('integer ', '') + '\\in\\mathbb{N}';
	    }, exp: function(text){
	        return text.replace('integer ', '') + 'in NN';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /sequence [^\s]+ [^\s]+ as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
	        var params = text.replace('sequence ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return '\\{' + params[0] + '_' + params[1] + '\\}_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}';
	    }, exp: function(text){
	        var params = text.replace('sequence ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return '{' + params[0] + '_' + params[1] + '}_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}';
	    }},
	    {mask: /sequence [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('sequence ', '').split(' ');
	        return '\\{' + params[0] + '_' + params[1] + '\\}';
	    }},
	    {mask: /sum of [^\s]+ [^\s]+ as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
	        var params = text.replace('sum of ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return '\\sum_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}' + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('sum of ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return 'sum_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}' + params[0] + '_' + params[1];
	    }},
	    {mask: /series [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('series ', '').split(' ');
	        return '\\sum' + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('series ', '').split(' ');
	        return 'sum' + params[0] + '_' + params[1];
	    }, priority: -1},
	    {mask: /sequence [^\s]+ [^\s]+ converges to/g, latex: function(text){
	        var params = text.replace('sequence ', '').replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to';
	    }, exp: function(text){
	        var params = text.replace('sequence ', '').replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + 'to';
	    }},
	    {mask: /[^\s]+ [^\s]+ converges to/g, latex: function(text){
	        var params = text.replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to';
	    }, exp: function(text){
	        var params = text.replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + 'to';
	    }},
	    {mask: /[^\s]+ [^\s]+ diverges to infinity/g, latex: function(text){
	        var params = text.replace(' diverges to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' diverges to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }},
	    {mask: /series [^\s]+ [^\s]+ diverges/g, latex: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }},
	    {mask: /[^\s]+ [^\s]+ diverges/g, latex: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return '\\sum' + params[0] + '_' + params[1] + '=\\infty';
	    }, exp: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return 'sum' + params[0] + '_' + params[1] + '= infty';
	    }},
	    {mask: /[^\s]+ [^\s]+ goes to infinity/g, latex: function(text){
	        var params = text.replace(' goes to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' goes to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }},
	    {mask: /[^\s]+ [^\s]+ approaches infinity/g, latex: function(text){
	        var params = text.replace(' approaches infinity', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' approaches infinity', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /the laplace operator of/g, latex: '\\Delta', exp: 'Delta'},
	    {mask: /the Laplacian of/g, latex: '\\Delta', exp: 'Delta'},
	    {mask: /nabla/g, latex: '\\nabla', exp: 'grad'},
	    {mask: /gradient of/g, latex: '\\nabla', exp: 'grad'},
	    {mask: /gradient/g, latex: '\\mathbf{grad}', exp: 'bb{g\\rad}'},
	    {mask: /divergence/g, latex: '\\mathbf{div}', exp: 'bb{d\iv}'},
	    {mask: /rotor/g, latex: '\\mathbf{rot}', exp: 'bb{rot}'},
	    {mask: /imaginary part of/g, latex: 'Im'},
	    {mask: /real part of/g, latex: 'Re'},
	    {mask: /as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
	        return text.replace('as ', '_{').replace(' goes from ', '=').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /as [^\s]+ runs over [^\s]+ to [^\s]+/g, latex: function(text){
	        return text.replace('as ', '_{').replace(' runs over ', '\\in').replace(' to ', '}^{') + '}';
	    }, exp: function(text){
	        return text.replace('as ', '_{').replace(' runs over ', 'in').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /as [^\s]+ is positive/g, latex: function(text){
	        return text.replace('as ', '_{').replace(' is positive', '\\gt0}');
	    }, exp: function(text){
	        return text.replace('as ', '_{').replace(' is positive', '>0}');
	    }},
	    {mask: /as [^\s]+ is negative/g, latex: function(text){
	        return text.replace('as ', '_{').replace(' is negative', '\\lt0}');
	    }, exp: function(text){
	        return text.replace('as ', '_{').replace(' is negative', '<0}');
	    }},
	    {mask: /residue of [^\s]+ of [^\s]+ at [^\s]+ equals [^\s]+/g, latex: function(text){
	        var params = text.replace('residue of ', '').replace('of ', '').replace('at ', '').replace('equals ', '').split(' ');
	        return 'res ' + '_{' + params[2] + '=' + params[3] + '}' + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: /minimum of [^\s]+ of [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
	        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
	    }, exp: function(text){
	        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
	        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: /maximum of [^\s]+ of [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
	        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
	    }, exp: function(text){
	        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
	        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return '\\sum' + params[2] + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return 'sum' + params[2] + params[0] + '_' + params[1];
	    }},
	    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return '\\sum' + params[2] + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return 'sum' + params[2] + params[0] + '_' + params[1];
	    }},
	    {mask: /product of [^\s]+ [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('product of ', '').split(' ');
	        return '\\sum' + params[2] + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('product of ', '').split(' ');
	        return 'sum' + params[2] + params[0] + '_' + params[1];
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	
	var elements = __webpack_require__(21);
	var formula = __webpack_require__(22);
	var pre = __webpack_require__(23);
	
	
	module.exports = [].concat(pre, elements, formula);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';
	
	var SIGNS = [
	  {mask: /sodium/g, latex: 'Na', exp: 'Na'},
	  {mask: /oxygen/g, latex: 'O', exp: 'O'},
	  {mask: /аluminum/g, latex: 'Al', exp: 'Al'},
	  {mask: /hydrogen/g, latex: 'H', exp: 'H'},
	  {mask: /lithium/g, latex: 'Li', exp: 'Li'},
	  {mask: /helium/g, latex: 'He', exp: 'He'},
	  {mask: /magnesium/g, latex: 'Mg', exp: 'Mg'},
	  {mask: /xalcium/g, latex: 'Ca', exp: 'Ca'},
	  {mask: /chromium/g, latex: 'Cr', exp: 'Cr'},
	  {mask: /potassium/g, latex: 'K', exp: 'K'},
	  {mask: /iron/g, latex: 'Fe', exp: 'Fe'},
	  {mask: /carbon/g, latex: 'C', exp: 'C'},
	
	
	
	  {mask: /argon/g, latex: 'Ar', exp: 'Ar'},
	  {mask: /americium/g, latex: 'Am', exp: 'Am'},
	  {mask: /arsenic/g, latex: 'Ar', exp: 'Ar'},
	  {mask: /astatine/g, latex: 'At', exp: 'At'},
	  {mask: /gold/g, latex: 'Au', exp: 'Au'},
	  {mask: /boron/g, latex: 'B', exp: 'B'},
	  {mask: /barium/g, latex: 'Ba', exp: 'Ba'},
	  {mask: /bohrium/g, latex: 'Bh', exp: 'Bh'},
	  {mask: /bismuth/g, latex: 'Bi', exp: 'Bi'},
	  {mask: /bromine/g, latex: 'Br', exp: 'Br'},
	  {mask: /cadmium/g, latex: 'Cd', exp: 'Cd'},
	  {mask: /cerium/g, latex: 'Ce', exp: 'Ce'},
	  {mask: /cobalt/g, latex: 'Co', exp: 'Co'},
	  {mask: /chlorine/g, latex: 'Cl', exp: 'Cl'},
	  {mask: /cesium/g, latex: 'Cs', exp: 'Cs'},
	  {mask: /copper/g, latex: 'Cu', exp: 'Cu'},
	  {mask: /dubnium/g, latex: 'Db', exp: 'Db'},
	  {mask: /darmstadtium/g, latex: 'Ds', exp: 'Ds'},
	  {mask: /dysprosium/g, latex: 'Dy', exp: 'Dy'},
	  {mask: /erbium/g, latex: 'Er', exp: 'Er'},
	  {mask: /einsteinium/g, latex: 'Es', exp: 'Es'},
	  {mask: /europium/g, latex: 'Eu', exp: 'Eu'},
	  {mask: /fluorine/g, latex: 'F', exp: 'F'},
	  {mask: /fermium/g, latex: 'Fm', exp: 'Fm'},
	  {mask: /francium/g, latex: 'Fr', exp: 'Fr'},
	  {mask: /gallium/g, latex: 'Ga', exp: 'Ga'},
	  {mask: /gadolinium/g, latex: 'Gd', exp: 'Gd'},
	  {mask: /germanium/g, latex: 'Ge', exp: 'Ge'},
	  {mask: /hafnium/g, latex: 'Hf', exp: 'Hf'},
	  {mask: /mercury/g, latex: 'Hg', exp: 'Hg'},
	  {mask: /holmium/g, latex: 'Ho', exp: 'Ho'},
	  {mask: /hassium/g, latex: 'Hs', exp: 'Hs'},
	  {mask: /iodine/g, latex: 'I', exp: 'I'},
	  {mask: /indium/g, latex: 'In', exp: 'In'},
	  {mask: /iridium/g, latex: 'Ir', exp: 'Ir'},
	  {mask: /potassium/g, latex: 'K', exp: 'K'},
	  {mask: /krypton/g, latex: 'Kr', exp: 'Kr'},
	  {mask: /lanthanum/g, latex: 'La', exp: 'La'},
	  {mask: /lithium/g, latex: 'Li', exp: 'Li'},
	  {mask: /lutetium/g, latex: 'Lu', exp: 'Lu'},
	  {mask: /mendelevium/g, latex: 'Md', exp: 'Md'},
	  {mask: /manganese/g, latex: 'Mn', exp: 'Mn'},
	  {mask: /molybdenum/g, latex: 'Mo', exp: 'Mo'},
	  {mask: /meitnerium/g, latex: 'Mt', exp: 'Mt'},
	  {mask: /nitrogen/g, latex: 'N', exp: 'N'},
	  {mask: /niobium/g, latex: 'Nb', exp: 'Nb'},
	  {mask: /neodymium/g, latex: 'Nd', exp: 'Nd'},
	  {mask: /neon/g, latex: 'Ne', exp: 'Ne'},
	  {mask: /nickel/g, latex: 'Ni', exp: 'Ni'},
	  {mask: /nobelium/g, latex: 'No', exp: 'No'},
	  {mask: /neptunium/g, latex: 'Np', exp: 'Np'},
	  {mask: /osmium/g, latex: 'Os', exp: 'Os'},
	  {mask: /phosphorus/g, latex: 'P', exp: 'P'},
	  {mask: /protactinium/g, latex: 'Pa', exp: 'Pa'},
	  {mask: /lead/g, latex: 'Pb', exp: 'Pb'},
	  {mask: /palladium/g, latex: 'Pd', exp: 'Pd'},
	  {mask: /promethium/g, latex: 'Pm', exp: 'Pm'},
	  {mask: /polonium/g, latex: 'Po', exp: 'Po'},
	  {mask: /praseodymium/g, latex: 'Pr', exp: 'Pr'},
	  {mask: /platinum/g, latex: 'Pt', exp: 'Pt'},
	  {mask: /plutonium/g, latex: 'Pu', exp: 'Pu'},
	  {mask: /radium/g, latex: 'Ra', exp: 'Ra'},
	  {mask: /rutherfordium/g, latex: 'Rf', exp: 'Rf'},
	  {mask: /ruthenium/g, latex: 'Ru', exp: 'Ru'},
	  {mask: /sulfur/g, latex: 'S', exp: 'S'},
	  {mask: /uranium/g, latex: 'U', exp: 'U'},
	  {mask: /zinc/g, latex: 'Zn', exp: 'Zn'},
	  {mask: /zirconium/g, latex: 'Zr', exp: 'Zr'}
	
	];
	
	
	
	
	module.exports = SIGNS;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	
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

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';
	
	var SIGNS = [
	  {mask: /to/g, latex: '2', exp: '2'}
	
	];
	
	
	
	
	module.exports = SIGNS;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 21.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /( the |^the )/g, exp: ' '}
	];
	
	module.exports = function(text){
	    var exp = text;
	    RULES.forEach(function(rule){
	        exp = exp.replace(rule.mask, rule.exp);
	    });
	    return exp;
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Created by Shayakhmetov on 23.08.2016.
	 */
	
	'use strict';
	
	var numbersProcessing = __webpack_require__(26);
	var symbols = __webpack_require__(27);
	var operators = __webpack_require__(28);
	var fractions = __webpack_require__(29);
	var letter = __webpack_require__(30);
	var logic = __webpack_require__(31);
	//var calculus = require('./calculus');
	var postprocessing = __webpack_require__(32);
	
	module.exports = function(text, options){
	    var exp;
	    switch(options.type){
	        case 'algebra':
	            var masks = [].concat(letter, fractions, symbols, operators);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            break;
	        case 'set':
	            var masks = [].concat(fractions, sets);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            break;
	        case 'logic':
	            var masks = [].concat(fractions, logic, sets, operators);
	            masks.sort(compare);
	            exp = process(numbersProcessing(text), masks, options.output);
	            break;
	    };
	    return postprocessing(exp);
	};
	
	function process(text, masks, output){
	    var resultStr = text;
	    console.log(text);
	    masks.forEach(function(sign){
	        var format = (output in sign)? output : 'latex';
	        resultStr = resultStr.replace(sign.mask, sign[format]);
	    });
	    return resultStr;
	}
	
	function compare(a,b){
	    if(!('priority' in a))
	        a.priority = 0;
	    if(!('priority' in b))
	        b.priority = 0;
	    if(a.priority < b.priority)
	        return 1;
	    if(a.priority > b.priority)
	        return -1;
	    return 0;
	}
	/*
	function numbersProcessing(text){
	    return text;
	}*/
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Created by 96664_000 on 16.08.2016.
	 */
	'use strict';
	
	var small = {
	        'cero': 0,
	        'uno': 1,
	        'dos': 2,
	        'tres': 3,
	        'cuatro': 4,
	        'cinco': 5,
	        'seis': 6,
	        'siete': 7,
	        'ocho': 8,
	        'nueve': 9,
	        'diez': 10,
	        'once': 11,
	        'doce': 12,
	        'trece': 13,
	        'catorce': 14,
	        'quince': 15,
	        'dieciseis': 16,
	        'diecisiete': 17,
	        'dieciocho': 18,
	        'diecinueve': 19
	    },
	    average = {
	        'veinte': 20,
	        'veinticuatro': 24,
	        'treinta': 30,
	        'cuarenta': 40,
	        'cincuenta': 50,
	        'sesenta': 60,
	        'setenta': 70,
	        'ochenta': 80,
	        'noventa': 90,
	        'cien': 100,
	        'doscientos': 200,
	        'trescientos': 300,
	        'cuatrocientos': 400,
	        'quinientos': 500,
	        'seiscientos': 600,
	        'setecientos': 700,
	        'ochocientos': 800,
	        'novecientos': 900
	    },
	    magnitudes = [
	        {text: 'cien', order: 2},
	        {text: 'mil', order: 3},
	        {text: 'millon', order: 6},
	        {text: 'mil millone', order: 9}
	    ],
	    ordinal = {
	    'nulo': 0,
	    'primero': 1,
	    'segundo': 2,
	    'tercero': 3,
	    'cuarto': 4,
	    'quinto': 5,
	    'sexto': 6,
	    'séptimo': 7,
	    'octavo': 8,
	    'noveno': 9,
	    'décimo': 10,
	    'undécimo':11
	};
	    module.exports = process;
	
	
	function process(text){
	    /*for(var number in small){
	     while(arr.indexOf(number) > -1){
	     var index = arr.indexOf(number);
	     arr[index] = small[number];
	     }
	     }*/
	    var resultArr = text.split(/\s+/);
	    var resultArr = resultArr.map(function(el, index){
	        if(el in small)
	            return small[el].toString();
	        if(el in ordinal)
	            return ordinal[el].toString() + '-th';
	        if(el in average){
	            if(index < resultArr.length - 1)
	                if(resultArr[index + 1] in small) {
	                    var nextVal = resultArr[index + 1];
	                    resultArr[index + 1] = '';
	                    return (average[el] / 10).toString() + small[nextVal].toString();
	                }
	            return average[el].toString();
	        }
	        return el;
	    });
	    magnitudes.forEach(function(magnitude){
	        while(resultArr.indexOf(magnitude.text) > -1){
	            var index = resultArr.indexOf(magnitude.text);
	            var currIndex = index + 1;
	            var order = 0;
	            resultArr[index] = '';
	            while ((currIndex < resultArr.length)&&(!isNaN(resultArr[currIndex]) || !isNaN(resultArr[currIndex].replace('-th', '')))) {
	                order += resultArr[currIndex].replace('-th', '').length;
	                resultArr[index] += resultArr[currIndex];
	                resultArr[currIndex] = '';
	                currIndex++;
	            }
	            if(!isNaN(resultArr[index - 1])) {
	                resultArr[index - 1] += zeros(magnitude.order - order) + resultArr[index];
	                resultArr[index] = '';
	            }
	            else
	                resultArr[index] = Math.pow(10, (magnitude.order - order > 0)? (magnitude.order - order) : 0).toString() + resultArr[index];
	        }
	    });
	    return resultArr.filter(function(v){return v!==''}).join(' ');
	}
	function zeros(n){
	    var resultStr = '';
	    if(n > 0)
	        for(var i = 0; i < n; i++){
	            resultStr += '0';
	        }
	    return resultStr;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	
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
	    {mask: /zeta/g, latex: '\\zeta', exp: 'zeta', priority: -1},
	
	  //for correct 'X' latin
	    {mask: /equis/g, latex: '\\x', exp: 'x'},
	    {mask: /me quieres/g, latex: '\\x', exp: 'x'}
	
	
	];
	
	module.exports = SIGNS;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

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


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 02.11.2016.
	 */
	'use strict';
	
	var SIGNS = [
	    {mask: /the one half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 2},
	    {mask: /and 1 half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /y medio/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /and a half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 0}
	];
	
	
	module.exports = SIGNS;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	
	var LETTER = [
	  {mask: /í/g, latex: 'i'},
	  {mask: /á/g, latex: 'a'},
	  {mask: /ú/g, latex: 'u'},
	  {mask: /é/g, latex: 'e'},
	  {mask: /ñ/g, latex: 'n'}
	];
	
	module.exports = LETTER;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 21.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: / o /g, latex: '\\lor', exp: 'vv'},
	    {mask: / y /g, latex: '\\wedge', exp: '^^', priority: -1},
	    {mask: / no /g, latex: '\\bar', exp: 'bar'},
	    {mask: / implica /g, latex: '\\Rightarrow', exp: 'rArr'},
	    {mask: / es equivalente a /g, latex: '\\sim', exp: '~'},
	];
	
	module.exports = RULES;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 21.09.2016.
	 */
	'use strict';
	
	var RULES = [
	  {mask: /( de |^de )/g, exp: ''},
	  {mask: /( la |^la )/g, exp: ''}
	];
	
	module.exports = function(text){
	    var exp = text;
	    RULES.forEach(function(rule){
	        exp = exp.replace(rule.mask, rule.exp);
	    });
	    return exp;
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Created by Makarova on 09.12.2016.
	 */
	
	'use strict';
	var symbols = __webpack_require__(34);
	var operators = __webpack_require__(35);
	var fractions = __webpack_require__(36);
	var postprocessing = __webpack_require__(37);
	
	var Az = __webpack_require__(38);
	
	
	module.exports = function(text, options){
	
	  var exp;
	  switch(options.type){
	    case 'algebra':
	      var masks = [].concat(fractions, symbols, operators);
	      masks.sort(compare);
	      exp = process(numbersProcessing(text), masks, options.output);
	      break;
	    case 'set':
	      break;
	    case 'logic':
	      break;
	  };
	  return postprocessing(exp);
	};
	
	function process(text, masks, output){
	  var resultStr = text;
	  masks.forEach(function(sign){
	    var format = (output in sign)? output : 'latex';
	    resultStr = resultStr.replace(sign.mask, sign[format]);
	  });
	  return resultStr;
	}
	
	function compare(a,b){
	  if(!('priority' in a))
	    a.priority = 0;
	  if(!('priority' in b))
	    b.priority = 0;
	  if(a.priority < b.priority)
	    return 1;
	  if(a.priority > b.priority)
	    return -1;
	  return 0;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

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


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';
	
	var SIGNS = [
	
	    {mask: /coma/g, latex: function(text){
	      return text.replace('coma ', '.');
	    }, priority: 2},
	
	    {mask: /mas/g, latex: '+'},
	    {mask: /plus/g, latex: '+'},
	    {mask: /suma de .+? y [^\s]+/g, latex: function(text){
	        return '(' + text.replace('suma de ', '').replace('y', '+') + ')';
	    }},
	
	    {mask: /\s?menos  /g, latex: '-', priority: 1},
	    {mask: /(a )?positivo /g, latex: ''},
	    {mask: /\s?negativo /g, latex: '-', priority: 1},
	    {mask: /diferencia de .+? y [^\s]+/g, latex: function(text){
	        return '(' + text.replace('diferencia de ', '').replace('y', '-') + ')';
	    }},
	
	    {mask: /mas menos/g, latex: '\\pm', priority: 2},
	
	    {mask: /por/g, latex: '\\times', exp: 'times'},
	    {mask: /multiplicado por/g, latex: '\\times', exp: 'times'},
	    {mask: /multiplicar/g, latex: '\\times', exp: 'times'},
	
	
	    {mask: /producto  de .+? y [^\s]+/g, latex: function(text){
	        return '(' + text.replace('producto  de ', '').replace('y', '\\times') + ')';
	    }, exp: function(text){
	        return '(' + text.replace('producto  de ', '').replace('y', 'times') + ')';
	    }},
	    {mask: /de dividir/g, latex: '/'},
	    {mask: /al dividir/g, latex: '/'},
	
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
	
	  {mask: / sub /g, latex: '_'},
	  {mask: / grado  /g, latex: '^'},
	  {mask: / factorial/g, latex: '!'},
	
	
	
	  {mask: / raiz cuadrada/g, latex: function(text){
	    return text.replace('raiz cuadrada', '\\sqrt');
	  }, exp: function(text){
	    return text.replace('raiz cuadrada', 'sqrt');
	  }, priority: 2},
	
	  {mask: /raiz cúbica de [^\s]+/g, latex: function(text){
	    return text.replace('raíz cúbica de ', '\\sqrt');
	  }, exp: function(text){
	    return text.replace('raíz cúbica de ', 'root[3]');
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


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 02.11.2016.
	 */
	'use strict';
	
	var SIGNS = [
	    {mask: /the one half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 2},
	    {mask: /and 1 half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /1 half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /and a half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 1},
	    {mask: /half/g, latex: '\\frac{1}{2}', exp: 'frac{1}{2}', priority: 0}
	
	];
	
	
	module.exports = SIGNS;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 21.09.2016.
	 */
	'use strict';
	
	var RULES = [
	  {mask: /( de |^de )/g, exp: ' '},
	  {mask: /( la |^la )/g, exp: ' '}
	];
	
	module.exports = function(text){
	    var exp = text;
	    RULES.forEach(function(rule){
	        exp = exp.replace(rule.mask, rule.exp);
	    });
	    return exp;
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {;(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define('Az', factory) :
	  global.Az = factory()
	}(this, function () { 'use strict';
	  /** @namespace Az **/
	  if (true) {
	    var fs = __webpack_require__(39);
	    console.log(fs);
	  }
	
	  var Az = {
	    load: function(url, responseType, callback) {
	      if (fs) {
	        fs.readFile(url, { encoding: responseType == 'json' ? 'utf8' : null }, function (err, data) {
	          if (err) {
	            callback(err);
	            return;
	          }
	
	          if (responseType == 'json') {
	            callback(null, JSON.parse(data));
	          } else
	          if (responseType == 'arraybuffer') {
	            if (data.buffer) {
	              callback(null, data.buffer);
	            } else {
	              var ab = new ArrayBuffer(data.length);
	              var view = new Uint8Array(ab);
	              for (var i = 0; i < data.length; ++i) {
	                  view[i] = data[i];
	              }
	              callback(null, ab);
	            }
	          } else {
	            callback(new Error('Unknown responseType'));
	          }
	        });
	        return;
	      }
	
	      var xhr = new XMLHttpRequest();
	      xhr.open('GET', url, true);
	      xhr.responseType = responseType;
	
	      xhr.onload = function (e) {
	        if (xhr.response) {
	          callback && callback(null, xhr.response);
	        }
	      };
	
	      xhr.send(null);
	    },
	    extend: function() {
	      var result = {};
	      for (var i = 0; i < arguments.length; i++) {
	        for (var key in arguments[i]) {
	          result[key] = arguments[i][key];
	        }
	      }
	      return result;
	    }
	  };
	
	  return Az;
	}));
	
	;(function (global, factory) {
	   true ? (module.exports = module.exports || {}) && (module.exports.DAWG = factory(module.exports)) :
	  typeof define === 'function' && define.amd ? define('Az.DAWG', ['Az'], factory) :
	  (global.Az = global.Az || {}) && (global.Az.DAWG = factory(global.Az))
	}(this, function (Az) { 'use strict';
	  var ROOT = 0,
	      MISSING = -1,
	      PRECISION_MASK = 0xFFFFFFFF,
	      HAS_LEAF_BIT = 1 << 8,
	      EXTENSION_BIT = 1 << 9,
	      OFFSET_MAX = 1 << 21,
	      IS_LEAF_BIT = 1 << 31;
	
	  var CP1251 = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16,
	    17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32,
	    33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48,
	    49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64,
	    65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80,
	    81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96,
	    97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112,
	    113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127,
	    1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192,
	    1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182,
	    183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213,
	    1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223,
	    1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230,
	    1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237,
	    1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246,
	    1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253,
	    8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190};
	
	  var UCS2 = {};
	  for (var k in CP1251) {
	    UCS2[CP1251[k]] = String.fromCharCode(k);
	    delete UCS2[0];
	    delete UCS2[1];
	  }
	
	  // Based on all common ЙЦУКЕН-keyboards (both Windows and Apple variations)
	  var COMMON_TYPOS = {
	    'й': 'ёцыф', 'ц': 'йфыву', 'у': 'цывак', 'к': 'увапе', 'е': 'капрн', 'н': 'епрог', 'г': 'нролш', 'ш': 'голдщ', 'щ': 'шлджз', 'з': 'щджэх-', 'х': 'зжэъ-', 'ъ': 'хэ-ё',
	    'ф': 'йцычяё', 'ы': 'йцувсчяф', 'в': 'цукамсчы', 'а': 'укепимсв', 'п': 'кенртима', 'р': 'енгоьтип', 'о': 'нгшлбьтр', 'л': 'гшщдюбьо', 'д': 'шщзжюбл', 'ж': 'щзхэюд', 'э': 'зхъжё',
	    'ё': 'йфяъэ', 'я': 'ёфыч', 'ч': 'яфывс', 'с': 'чывам', 'м': 'свапи', 'и': 'мапрт', 'т': 'ипроь', 'ь': 'тролб', 'б': 'ьолдю', 'ю': 'блдж',
	    '1': 'ёйц', '2': 'йцу', '3': 'цук', '4': 'уке', '5': 'кен', '6': 'енг', '7': 'нгш', '8': 'гшщ', '9': 'шщз', '0': 'щзх-', '-': 'зхъ', '=': '-хъ', '\\': 'ъэ', '.': 'южэ'
	  };
	
	  function offset(base) {
	    return ((base >> 10) << ((base & EXTENSION_BIT) >> 6)) & PRECISION_MASK;
	  }
	
	  function label(base) {
	    return base & (IS_LEAF_BIT | 0xFF) & PRECISION_MASK;
	  }
	
	  function hasLeaf(base) {
	    return (base & HAS_LEAF_BIT & PRECISION_MASK) != 0;
	  }
	
	  function value(base) {
	    return base & ~IS_LEAF_BIT & PRECISION_MASK;
	  }
	
	  var DAWG = function(units, guide, format) {
	    this.units = units;
	    this.guide = guide;
	    this.format = format;
	  }
	
	  DAWG.fromArrayBuffer = function(data, format) {
	    var dv = new DataView(data),
	        unitsLength = dv.getUint32(0, true),
	        guideLength = dv.getUint32(unitsLength * 4 + 4, true);
	    return new DAWG(
	      new Uint32Array(data, 4, unitsLength),
	      new Uint8Array(data, unitsLength * 4 + 8, guideLength * 2),
	      format);
	  }
	
	  DAWG.load = function(url, format, callback) {
	    Az.load(url, 'arraybuffer', function(err, data) {
	      callback(err, err ? null : DAWG.fromArrayBuffer(data, format));
	    });
	  }
	
	  DAWG.prototype.followByte = function(c, index) {
	    var o = offset(this.units[index]);
	    var nextIndex = (index ^ o ^ (c & 0xFF)) & PRECISION_MASK;
	
	    if (label(this.units[nextIndex]) != (c & 0xFF)) {
	      return MISSING;
	    }
	
	    return nextIndex;
	  }
	
	  DAWG.prototype.followString = function(str, index) {
	    index = index || ROOT;
	    for (var i = 0; i < str.length; i++) {
	      var code = str.charCodeAt(i);
	      if (!(code in CP1251)) {
	        return MISSING;
	      }
	      index = this.followByte(CP1251[code], index);
	      if (index == MISSING) {
	        return MISSING;
	      }
	    }
	    return index;
	  }
	
	  DAWG.prototype.hasValue = function(index) {
	    return hasLeaf(this.units[index]);
	  }
	
	  DAWG.prototype.value = function(index) {
	    var o = offset(this.units[index]);
	    var valueIndex = (index ^ o) & PRECISION_MASK;
	    return value(this.units[valueIndex]);
	  }
	
	  DAWG.prototype.find = function(str) {
	    var index = this.followString(str);
	    if (index == MISSING) {
	        return MISSING;
	    }
	    if (!this.hasValue(index)) {
	        return MISSING;
	    }
	    return this.value(index);
	  }
	
	  DAWG.prototype.iterateAll = function(index) {
	    var results = [];
	    var stack = [index];
	    var key = [];
	    var last = ROOT;
	    var label;
	
	    while (true) {
	      index = stack[stack.length - 1];
	
	      if (last != ROOT) {
	        label = this.guide[index << 1];
	        if (label) {
	          index = this.followByte(label, index);
	          if (index == MISSING) {
	            return results;
	          }
	          key.push(label);
	          stack.push(index);
	        } else {
	          do {
	            label = this.guide[(index << 1) + 1];
	            key.pop();
	            stack.pop();
	            if (!stack.length) {
	              return results;
	            }
	            index = stack[stack.length - 1];
	            if (label) {
	              index = this.followByte(label, index);
	              if (index == MISSING) {
	                return results;
	              }
	              key.push(label);
	              stack.push(index);
	            }
	          } while (!label);
	        }
	      }
	
	      while (!this.hasValue(index)) {
	        var label = this.guide[index << 1];
	        index = this.followByte(label, index);
	        if (index == MISSING) {
	          return results;
	        }
	        key.push(label);
	        stack.push(index);
	      }
	
	      // Only three formats supported
	      if (this.format == 'words') {
	        results.push([
	          ((key[0] ^ 1) << 6) + (key[1] >> 1),
	          ((key[2] ^ 1) << 6) + (key[3] >> 1)
	        ]);
	      } else
	      if (this.format == 'probs') {
	        results.push([
	          ((key[0] ^ 1) << 6) + (key[1] >> 1),
	          ((key[2] ^ 1) << 6) + (key[3] >> 1),
	          ((key[4] ^ 1) << 6) + (key[5] >> 1)
	        ]);
	      } else {
	        // Raw bytes
	        results.push(key.slice());
	      }
	      last = index;
	    }
	  }
	
	  // Features:
	  //  replaces (е -> ё) (DONE)
	  //  stutter (ннет -> нет, гоол -> гол, д-да -> да)
	  //  typos (count-limited):
	  //    swaps (солво -> слово)
	  //    extra letters (свлово -> слово)
	  //    missing letters (сово -> слово)
	  //    wrong letters (сково -> слово)
	  DAWG.prototype.findAll = function(str, replaces, mstutter, mtypos) {
	    mtypos = mtypos || 0;
	    mstutter = mstutter || 0;
	    var results = [],
	        prefixes = [['', 0, 0, 0, ROOT]],
	        prefix, index, len, code, cur, typos, stutter;
	
	    while (prefixes.length) {
	      prefix = prefixes.pop();
	      index = prefix[4], stutter = prefix[3], typos = prefix[2], len = prefix[1], prefix = prefix[0];
	
	      // Done
	      if (len == str.length) {
	        if (typos < mtypos && !stutter) {
	          // Allow missing letter(s) at the very end
	          var label = this.guide[index << 1]; // First child
	          do {
	            cur = this.followByte(label, index);
	            if ((cur != MISSING) && (label in UCS2)) {
	              prefixes.push([ prefix + UCS2[label], len, typos + 1, stutter, cur ]);
	            }
	            label = this.guide[(cur << 1) + 1]; // Next child
	          } while (cur != MISSING);
	        }
	
	        if (this.format == 'int') {
	          if (this.hasValue(index)) {
	            results.push([prefix, this.value(index)]);
	          }
	          continue;
	        }
	        // Find all payloads
	        if (this.format == 'words' || this.format == 'probs') {
	          index = this.followByte(1, index); // separator
	          if (index == MISSING) {
	            continue;
	          }
	        }
	        results.push([prefix, this.iterateAll(index), stutter, typos]);
	        continue;
	      }
	
	      // Follow a replacement path
	      if (replaces && str[len] in replaces) {
	        code = replaces[str[len]].charCodeAt(0);
	        if (code in CP1251) {
	          cur = this.followByte(CP1251[code], index);
	          if (cur != MISSING) {
	            prefixes.push([ prefix + replaces[str[len]], len + 1, typos, stutter, cur ]);
	          }
	        }
	      }
	
	      // Follow typos path (if not over limit)
	      if (typos < mtypos && !stutter) {
	        // Skip a letter entirely (extra letter)
	        prefixes.push([ prefix, len + 1, typos + 1, stutter, index ]);
	
	        // Add a letter (missing)
	        // TODO: iterate all childs?
	        var label = this.guide[index << 1]; // First child
	        do {
	          cur = this.followByte(label, index);
	          if ((cur != MISSING) && (label in UCS2)) {
	            prefixes.push([ prefix + UCS2[label], len, typos + 1, stutter, cur ]);
	          }
	          label = this.guide[(cur << 1) + 1]; // Next child
	        } while (cur != MISSING);
	
	        // Replace a letter
	        // Now it checks only most probable typos (located near to each other on keyboards)
	        var possible = COMMON_TYPOS[str[len]];
	        if (possible) {
	          for (var i = 0; i < possible.length; i++) {
	            code = possible.charCodeAt(i);
	            if (code in CP1251) {
	              cur = this.followByte(CP1251[code], index);
	              if (cur != MISSING) {
	                // for missing letter we need to iterate all childs, not only COMMON_TYPOS
	                // prefixes.push([ prefix + possible[i], len, typos + 1, stutter, cur ]);
	                prefixes.push([ prefix + possible[i], len + 1, typos + 1, stutter, cur ]);
	              }
	            }
	          }
	        }
	
	        // Swapped two letters
	        // TODO: support for replacements?
	        if (len < str.length - 1) {
	          code = str.charCodeAt(len + 1);
	          if (code in CP1251) {
	            cur = this.followByte(CP1251[code], index);
	            if (cur != MISSING) {
	              code = str.charCodeAt(len);
	              if (code in CP1251) {
	                cur = this.followByte(CP1251[code], cur);
	                if (cur != MISSING) {
	                  prefixes.push([ prefix + str[len + 1] + str[len], len + 2, typos + 1, stutter, cur ]);
	                }
	              }
	            }
	          }
	        }
	      }
	
	      // Follow base path
	      code = str.charCodeAt(len);
	      if (code in CP1251) {
	        cur = this.followByte(CP1251[code], index);
	        if (cur != MISSING) {
	          prefixes.push([ prefix + str[len], len + 1, typos, stutter, cur ]);
	
	          while (stutter < mstutter && !typos && len < str.length - 1) {
	            // Follow a simple stutter path (merge two equal letters into one)
	            if (str[len] == str[len + 1]) {
	              prefixes.push([ prefix + str[len], len + 2, typos, stutter + 1, cur ]);
	              len++;
	            } else
	            // Follow a stutter with a dash (д-да)
	            if (len < str.length - 2 && str[len + 1] == '-' && str[len] == str[len + 2]) {
	              prefixes.push([ prefix + str[len], len + 3, typos, stutter + 1, cur ]);
	              len += 2;
	            } else {
	              break;
	            }
	            stutter++;
	          }
	        }
	      }
	    }
	    return results;
	  }
	
	  return DAWG;
	}));
	;(function (global, factory) {
	   true ? (module.exports = module.exports || {}) && (module.exports.Morph = factory(module.exports)) :
	  typeof define === 'function' && define.amd ? define('Az.Morph', ['Az', 'Az.DAWG'], factory) :
	  (global.Az = global.Az || {}) && (global.Az.Morph = factory(global.Az))
	}(this, function (Az) { 'use strict';
	  /** @namespace Az **/
	  var words,
	      probabilities,
	      predictionSuffixes = new Array(3),
	      prefixes = [ '', 'по', 'наи' ],
	      suffixes,
	      grammemes,
	      paradigms,
	      tags,
	      defaults = {
	        ignoreCase: false,
	        replacements: { 'е': 'ё' },
	        stutter: Infinity,
	        typos: 0,
	        parsers: [
	          // Словарные слова + инициалы
	          'Dictionary?', 'AbbrName?', 'AbbrPatronymic',
	          // Числа, пунктуация, латиница (по-хорошему, токенизатор не должен эту ерунду сюда пускать)
	          'IntNumber', 'RealNumber', 'Punctuation', 'RomanNumber?', 'Latin',
	          // Слова с дефисами
	          'HyphenParticle', 'HyphenAdverb', 'HyphenWords',
	          // Предсказатели по префиксам/суффиксам
	          'PrefixKnown', 'PrefixUnknown?', 'SuffixKnown?', 'Abbr'
	        ],
	        forceParse: false,
	        normalizeScore: true
	      },
	      initials = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ',
	      particles = ['-то', '-ка', '-таки', '-де', '-тко', '-тка', '-с', '-ста'],
	      knownPrefixes = [
	        'авиа', 'авто', 'аква', 'анти', 'анти-', 'антропо', 'архи', 'арт', 'арт-', 'астро', 'аудио', 'аэро',
	        'без', 'бес', 'био', 'вело', 'взаимо', 'вне', 'внутри', 'видео', 'вице-', 'вперед', 'впереди',
	        'гекто', 'гелио', 'гео', 'гетеро', 'гига', 'гигро', 'гипер', 'гипо', 'гомо',
	        'дву', 'двух', 'де', 'дез', 'дека', 'деци', 'дис', 'до', 'евро', 'за', 'зоо', 'интер', 'инфра',
	        'квази', 'квази-', 'кило', 'кино', 'контр', 'контр-', 'космо', 'космо-', 'крипто', 'лейб-', 'лже', 'лже-',
	        'макро', 'макси', 'макси-', 'мало', 'меж', 'медиа', 'медиа-', 'мега', 'мета', 'мета-', 'метео', 'метро', 'микро',
	        'милли', 'мини', 'мини-', 'моно', 'мото', 'много', 'мульти',
	        'нано', 'нарко', 'не', 'небез', 'недо', 'нейро', 'нео', 'низко', 'обер-', 'обще', 'одно', 'около', 'орто',
	        'палео', 'пан', 'пара', 'пента', 'пере', 'пиро', 'поли', 'полу', 'после', 'пост', 'пост-',
	        'порно', 'пра', 'пра-', 'пред', 'пресс-', 'противо', 'противо-', 'прото', 'псевдо', 'псевдо-',
	        'радио', 'разно', 'ре', 'ретро', 'ретро-', 'само', 'санти', 'сверх', 'сверх-', 'спец', 'суб', 'супер', 'супер-', 'супра',
	        'теле', 'тетра', 'топ-', 'транс', 'транс-', 'ультра', 'унтер-', 'штаб-',
	        'экзо', 'эко', 'эндо', 'эконом-', 'экс', 'экс-', 'экстра', 'экстра-', 'электро', 'энерго', 'этно'
	      ],
	      autoTypos = [4, 9],
	      UNKN,
	      __init = [],
	      initialized = false;
	
	  // Взято из https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
	  function deepFreeze(obj) {
	    if (!('freeze' in Object)) {
	      return;
	    }
	
	    var propNames = Object.getOwnPropertyNames(obj);
	    propNames.forEach(function(name) {
	      var prop = obj[name];
	
	      if (typeof prop == 'object' && prop !== null)
	        deepFreeze(prop);
	    });
	
	    return Object.freeze(obj);
	  }
	
	  /**
	   * Тег. Содержит в себе информацию о конкретной форме слова, но при этом
	   * к конкретному слову не привязан. Всевозможные значения тегов переиспользуются
	   * для всех разборов слов.
	   *
	   * Все граммемы навешаны на тег как поля. Если какая-то граммема содержит в себе
	   * дочерние граммемы, то значением поля является именно название дочерней
	   * граммемы (например, tag.GNdr == 'masc'). В то же время для дочерних граммем
	   * значением является просто true (т.е. условие можно писать и просто как
	   * if (tag.masc) ...).
	   *
	   * @property {string[]} stat Полный список неизменяемых граммем.
	   * @property {string[]} flex Полный список изменяемых граммем.
	   * @property {Tag} ext Копия тега с русскими обозначениями (по версии OpenCorpora).
	   */
	  var Tag = function(str) {
	    var par, pair = str.split(' ');
	    this.stat = pair[0].split(',');
	    this.flex = pair[1] ? pair[1].split(',') : [];
	    for (var j = 0; j < 2; j++) {
	      var grams = this[['stat', 'flex'][j]];
	      for (var i = 0; i < grams.length; i++) {
	        var gram = grams[i];
	        this[gram] = true;
	        // loc2 -> loct -> CAse
	        while (grammemes[gram] && (par = grammemes[gram].parent)) {
	          this[par] = gram;
	          gram = par;
	        }
	      }
	    }
	    if ('POST' in this) {
	      this.POS = this.POST;
	    }
	  }
	
	  /**
	   * Возвращает текстовое представление тега.
	   *
	   * @returns {string} Список неизменяемых граммем через запятую, пробел,
	   *  и список изменяемых граммем через запятую.
	   */
	  Tag.prototype.toString = function() {
	    return (this.stat.join(',') + ' ' + this.flex.join(',')).trim();
	  }
	
	  /**
	   * Проверяет согласованность с конкретными значениями граммем либо со списком
	   * граммем из другого тега (или слова).
	   *
	   * @param {Tag|Parse} [tag] Тег или разбор слова, с которым следует
	   *  проверить согласованность.
	   * @param {Array|Object} grammemes Граммемы, по которым нужно проверить
	   *  согласованность.
	   *
	   *  Если указан тег (или разбор), то grammemes должен быть массивом тех
	   *  граммем, которые у обоих тегов должны совпадать. Например:
	   *  tag.matches(otherTag, ['POS', 'GNdr'])
	   *
	   *  Если тег не указан, а указан массив граммем, то проверяется просто их
	   *  наличие. Например, аналог выражения (tag.NOUN && tag.masc):
	   *  tag.matches([ 'NOUN', 'masc' ])
	   *
	   *  Если тег не указан, а указан объект, то ключи в нем — названия граммем,
	   *  значения — дочерние граммемы, массивы граммем, либо true/false:
	   *  tag.matches({ 'POS' : 'NOUN', 'GNdr': ['masc', 'neut'] })
	   * @returns {boolean} Является ли текущий тег согласованным с указанным.
	   */
	  // TODO: научиться понимать, что некоторые граммемы можно считать эквивалентными при сравнении двух тегов (вариации падежей и т.п.)
	  Tag.prototype.matches = function(tag, grammemes) {
	    if (!grammemes) {
	      if (Object.prototype.toString.call(tag) === '[object Array]') {
	        for (var i = 0; i < tag.length; i++) {
	          if (!this[tag[i]]) {
	            return false;
	          }
	        }
	        return true;
	      } else
	      // Match to map
	      for (var k in tag) {
	        if (Object.prototype.toString.call(tag[k]) === '[object Array]') {
	          if (!tag[k].indexOf(this[k])) {
	            return false;
	          }
	        } else {
	          if (tag[k] != this[k]) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	
	    if (tag instanceof Parse) {
	      tag = tag.tag;
	    }
	
	    // Match to another tag
	    for (var i = 0; i < grammemes.length; i++) {
	      if (tag[grammemes[i]] != this[grammemes[i]]) {
	        // Special case: tag.CAse
	        return false;
	      }
	    }
	    return true;
	  }
	
	  Tag.prototype.isProductive = function() {
	    return !(this.NUMR || this.NPRO || this.PRED || this.PREP ||
	      this.CONJ || this.PRCL || this.INTJ || this.Apro ||
	      this.NUMB || this.ROMN || this.LATN || this.PNCT ||
	      this.UNKN);
	  }
	
	  Tag.prototype.isCapitalized = function() {
	    return this.Name || this.Surn || this.Patr || this.Geox || this.Init;
	  }
	
	  function makeTag(tagInt, tagExt) {
	    var tag = new Tag(tagInt);
	    tag.ext = new Tag(tagExt);
	    return deepFreeze(tag);
	  }
	
	  /**
	   * Производит морфологический анализ слова. Возвращает возможные варианты
	   * разбора по убыванию их правдоподобности.
	   *
	   * @playground
	   * var Az = require('az');
	   * Az.Morph.init(function() {
	   *   console.log(Az.Morph('стали'));
	   * });
	   * @param {string} word Слово, которое следует разобрать.
	   * @param {Object} [config] Опции разбора.
	   * @param {boolean} [config.ignoreCase=False] Следует ли игнорировать
	   *  регистр слов (в основном это означает возможность написания имен собственных и
	   *  инициалов с маленькой буквы).
	   * @param {Object} [config.replacements={ 'е': 'ё' }] Допустимые замены букв
	   *  при поиске слов в словаре. Ключи объекта — заменяемые буквы в разбираемом
	   *  слове, соответствующие им значения — буквы в словарных словах, которым
	   *  допустимо встречаться вместо заменяемых. По умолчанию буква «е» может
	   *  соответствовать букве «ё» в словарных словах.
	   * @param {number} [config.stutter=Infinity] «Заикание». Устраняет повторения букв
	   *  (как с дефисом - «не-е-ет», так и без - «нееет»).
	   *
	   *  Infinity не ограничивает максимальное число повторений (суммарно во всем слове).
	   *
	   *  0 или false чтобы отключить.
	   * @param {number|'auto'} [config.typos=0] Опечатки. Максимальное количество
	   * опечаток в слове.
	   *
	   *  Опечаткой считается:
	   *  - лишняя буква в слове
	   *  - пропущенная буква в слове (TODO: самый медленный тип опечаток, стоит сделать опциональным)
	   *  - не та буква в слове (если правильная буква стоит рядом на клавиатуре)
	   *  - переставленные местами соседние буквы
	   *
	   *  0 или false чтобы отключить.
	   *
	   *  'auto':
	   *  - 0, если слово короче 5 букв
	   *  - 1, если слово короче 10 букв (но только если не нашлось варианта разбора без опечаток)
	   *  - 2 в противном случае (но только если не нашлось варианта разбора без опечаток или с 1 опечаткой)
	   * @param {string[]} [config.parsers] Список применяемых парсеров (см. поля
	   *  объекта Az.Morph.Parsers) в порядке применения (т.е. стоящие в начале
	   *  имеют наивысший приоритет).
	   *
	   *  Вопросительный знак означает, что данный парсер не терминальный, то есть
	   *  варианты собираются до первого терминального парсера. Иными словами, если
	   *  мы дошли до какого-то парсера, значит все стоящие перед ним терминальные
	   *  парсеры либо не дали результата совсем, либо дали только с опечатками.
	   *
	   *  (парсер в терминологии pymorphy2 — анализатор)
	   * @param {boolean} [config.forceParse=False] Всегда возвращать хотя бы один вариант
	   *  разбора (как это делает pymorphy2), даже если совсем ничего не получилось.
	   * @returns {Parse[]} Варианты разбора.
	   * @memberof Az
	   */
	  var Morph = function(word, config) {
	    if (!initialized) {
	      throw new Error('Please call Az.Morph.init() before using this module.');
	    }
	
	    config = config ? Az.extend(defaults, config) : defaults;
	
	    var parses = [];
	    var matched = false;
	    for (var i = 0; i < config.parsers.length; i++) {
	      var name = config.parsers[i];
	      var terminal = name[name.length - 1] != '?';
	      name = terminal ? name : name.slice(0, -1);
	      if (name in Morph.Parsers) {
	        var vars = Morph.Parsers[name](word, config);
	        for (var j = 0; j < vars.length; j++) {
	          vars[j].parser = name;
	          if (!vars[j].stutterCnt && !vars[j].typosCnt) {
	            matched = true;
	          }
	        }
	
	        parses = parses.concat(vars);
	        if (matched && terminal) {
	          break;
	        }
	      } else {
	        console.warn('Parser "' + name + '" is not found. Skipping');
	      }
	    }
	
	    if (!parses.length && config.forceParse) {
	      parses.push(new Parse(word.toLocaleLowerCase(), UNKN));
	    }
	
	    var total = 0;
	    for (var i = 0; i < parses.length; i++) {
	      if (parses[i].parser == 'Dictionary') {
	        var res = probabilities.findAll(parses[i] + ':' + parses[i].tag);
	        if (res && res[0]) {
	          parses[i].score = (res[0][1] / 1000000) * getDictionaryScore(parses[i].stutterCnt, parses[i].typosCnt);
	          total += parses[i].score;
	        }
	      }
	    }
	
	    // Normalize Dictionary & non-Dictionary scores separately
	    if (config.normalizeScore) {
	      if (total > 0) {
	        for (var i = 0; i < parses.length; i++) {
	          if (parses[i].parser == 'Dictionary') {
	            parses[i].score /= total;
	          }
	        }
	      }
	
	      total = 0;
	      for (var i = 0; i < parses.length; i++) {
	        if (parses[i].parser != 'Dictionary') {
	          total += parses[i].score;
	        }
	      }
	      if (total > 0) {
	        for (var i = 0; i < parses.length; i++) {
	          if (parses[i].parser != 'Dictionary') {
	            parses[i].score /= total;
	          }
	        }
	      }
	    }
	
	    parses.sort(function(e1, e2) {
	      return e2.score - e1.score;
	    });
	
	    return parses;
	  }
	
	  // TODO: вынести парсеры в отдельный файл(ы)?
	
	  Morph.Parsers = {}
	
	  /**
	   * Один из возможных вариантов морфологического разбора.
	   *
	   * @property {string} word Слово в текущей форме (с исправленными ошибками,
	   *  если они были)
	   * @property {Tag} tag Тег, описывающий текущую форму слова.
	   * @property {number} score Число от 0 до 1, соответствующее «уверенности»
	   *  в данном разборе (чем оно выше, тем вероятнее данный вариант).
	   * @property {number} stutterCnt Число «заиканий», исправленных в слове.
	   * @property {number} typosCnt Число опечаток, исправленных в слове.
	   */
	  var Parse = function(word, tag, score, stutterCnt, typosCnt) {
	    this.word = word;
	    this.tag = tag;
	    this.stutterCnt = stutterCnt || 0;
	    this.typosCnt = typosCnt || 0;
	    this.score = score || 0;
	  }
	
	  /**
	   * Приводит слово к его начальной форме.
	   *
	   * @param {boolean} keepPOS Не менять часть речи при нормализации (например,
	   *  не делать из причастия инфинитив).
	   * @returns {Parse} Разбор, соответствующий начальной форме или False,
	   *  если произвести нормализацию не удалось.
	   */
	  // TODO: некоторые смены частей речи, возможно, стоит делать в любом случае (т.к., например, компаративы, краткие формы причастий и прилагательных разделены, инфинитив отделен от глагола)
	  Parse.prototype.normalize = function(keepPOS) {
	    return this.inflect(keepPOS ? { POS: this.tag.POS } : 0);
	  }
	
	  /**
	   * Приводит слово к указанной форме.
	   *
	   * @param {Tag|Parse} [tag] Тег или другой разбор слова, с которым следует
	   *  согласовать данный.
	   * @param {Array|Object} grammemes Граммемы, по которым нужно согласовать слово.
	   * @returns {Parse|False} Разбор, соответствующий указанной форме или False,
	   *  если произвести согласование не удалось.
	   * @see Tag.matches
	   */
	  Parse.prototype.inflect = function(tag, grammemes) {
	    return this;
	  }
	
	  /**
	   * Приводит слово к форме, согласующейся с указанным числом.
	   * Вместо конкретного числа можно указать категорию (согласно http://www.unicode.org/cldr/charts/29/supplemental/language_plural_rules.html).
	   *
	   * @param {number|string} number Число, с которым нужно согласовать данное слово или категория, описывающая правило построения множественного числа.
	   * @returns {Parse|False} Разбор, соответствующий указанному числу или False,
	   *  если произвести согласование не удалось.
	   */
	  Parse.prototype.pluralize = function(number) {
	    if (!this.tag.NOUN && !this.tag.ADJF && !this.tag.PRTF) {
	      return this;
	    }
	
	    if (typeof number == 'number') {
	      number = number % 100;
	      if ((number % 10 == 0) || (number % 10 > 4) || (number > 4 && number < 21)) {
	        number = 'many';
	      } else
	      if (number % 10 == 1) {
	        number = 'one';
	      } else {
	        number = 'few';
	      }
	    }
	
	    if (this.tag.NOUN && !this.tag.nomn && !this.tag.accs) {
	      return this.inflect([number == 'one' ? 'sing' : 'plur', this.tag.CAse]);
	    } else
	    if (number == 'one') {
	      return this.inflect(['sing', this.tag.nomn ? 'nomn' : 'accs'])
	    } else
	    if (this.tag.NOUN && (number == 'few')) {
	      return this.inflect(['sing', 'gent']);
	    } else
	    if ((this.tag.ADJF || this.tag.PRTF) && this.tag.femn && (number == 'few')) {
	      return this.inflect(['plur', 'nomn']);
	    } else {
	      return this.inflect(['plur', 'gent']);
	    }
	  }
	
	  /**
	   * Проверяет, согласуется ли текущая форма слова с указанной.
	   *
	   * @param {Tag|Parse} [tag] Тег или другой разбор слова, с которым следует
	   *  проверить согласованность.
	   * @param {Array|Object} grammemes Граммемы, по которым нужно проверить
	   *  согласованность.
	   * @returns {boolean} Является ли текущая форма слова согласованной с указанной.
	   * @see Tag.matches
	   */
	  Parse.prototype.matches = function(tag, grammemes) {
	    return this.tag.matches(tag, grammemes);
	  }
	
	  /**
	   * Возвращает текущую форму слова.
	   *
	   * @returns {String} Текущая форма слова.
	   */
	  Parse.prototype.toString = function() {
	    return this.word;
	  }
	
	  // Выводит информацию о слове в консоль.
	  Parse.prototype.log = function() {
	    console.group(this.toString());
	    console.log('Stutter?', this.stutterCnt, 'Typos?', this.typosCnt);
	    console.log(this.tag.ext.toString());
	    console.groupEnd();
	  }
	
	  function lookup(dawg, word, config) {
	    var entries;
	    if (config.typos == 'auto') {
	      entries = dawg.findAll(word, config.replacements, config.stutter, 0);
	      for (var i = 0; i < autoTypos.length && !entries.length && word.length > autoTypos[i]; i++) {
	        entries = dawg.findAll(word, config.replacements, config.stutter, i + 1);
	      }
	    } else {
	      entries = dawg.findAll(word, config.replacements, config.stutter, config.typos);
	    }
	    return entries;
	  }
	
	  function getDictionaryScore(stutterCnt, typosCnt) {
	    // = 1.0 if no stutter/typos
	    // = 0.3 if any number of stutter or 1 typo
	    // = 0.09 if 2 typos
	    // = 0.027 if 3 typos
	    return Math.pow(0.3, Math.min(stutterCnt, 1) + typosCnt);
	  }
	
	  var DictionaryParse = function(word, paradigmIdx, formIdx, stutterCnt, typosCnt, prefix, suffix) {
	    this.word = word;
	    this.paradigmIdx = paradigmIdx;
	    this.paradigm = paradigms[paradigmIdx];
	    this.formIdx = formIdx;
	    this.formCnt = this.paradigm.length / 3;
	    this.tag = tags[this.paradigm[this.formCnt + formIdx]];
	    this.stutterCnt = stutterCnt || 0;
	    this.typosCnt = typosCnt || 0;
	    this.score = getDictionaryScore(this.stutterCnt, this.typosCnt);
	    this.prefix = prefix || '';
	    this.suffix = suffix || '';
	  }
	
	  DictionaryParse.prototype = Object.create(Parse.prototype);
	  DictionaryParse.prototype.constructor = DictionaryParse;
	
	  // Возвращает основу слова
	  DictionaryParse.prototype.base = function() {
	    if (this._base) {
	      return this._base;
	    }
	    return (this._base = this.word.substring(
	      prefixes[this.paradigm[(this.formCnt << 1) + this.formIdx]].length,
	      this.word.length - suffixes[this.paradigm[this.formIdx]].length)
	    );
	  }
	
	  // Склоняет/спрягает слово так, чтобы оно соответствовало граммемам другого слова, тега или просто конкретным граммемам (подробнее см. Tag.prototype.matches).
	  // Всегда выбирается первый подходящий вариант.
	  DictionaryParse.prototype.inflect = function(tag, grammemes) {
	    if (!grammemes && typeof tag === 'number') {
	      // Inflect to specific formIdx
	      return new DictionaryParse(
	          prefixes[this.paradigm[(this.formCnt << 1) + tag]] +
	          this.base() +
	          suffixes[this.paradigm[tag]],
	        this.paradigmIdx,
	        tag, 0, 0, this.prefix, this.suffix
	      );
	    }
	
	    for (var formIdx = 0; formIdx < this.formCnt; formIdx++) {
	      if (tags[this.paradigm[this.formCnt + formIdx]].matches(tag, grammemes)) {
	        return new DictionaryParse(
	            prefixes[this.paradigm[(this.formCnt << 1) + formIdx]] +
	            this.base() +
	            suffixes[this.paradigm[formIdx]],
	          this.paradigmIdx,
	          formIdx, 0, 0, this.prefix, this.suffix
	        );
	      }
	    }
	
	    return false;
	  }
	
	  DictionaryParse.prototype.log = function() {
	    console.group(this.toString());
	    console.log('Stutter?', this.stutterCnt, 'Typos?', this.typosCnt);
	    console.log(prefixes[this.paradigm[(this.formCnt << 1) + this.formIdx]] + '|' + this.base() + '|' + suffixes[this.paradigm[this.formIdx]]);
	    console.log(this.tag.ext.toString());
	    var norm = this.normalize();
	    console.log('=> ', norm + ' (' + norm.tag.ext.toString() + ')');
	    norm = this.normalize(true);
	    console.log('=> ', norm + ' (' + norm.tag.ext.toString() + ')');
	    console.groupCollapsed('Все формы: ' + this.formCnt);
	    for (var formIdx = 0; formIdx < this.formCnt; formIdx++) {
	      var form = this.inflect(formIdx);
	      console.log(form + ' (' + form.tag.ext.toString() + ')');
	    }
	    console.groupEnd();
	    console.groupEnd();
	  }
	
	  DictionaryParse.prototype.toString = function() {
	    if (this.prefix) {
	      var pref = prefixes[this.paradigm[(this.formCnt << 1) + this.formIdx]];
	      return pref + this.prefix + this.word.substr(pref.length) + this.suffix;
	    } else {
	      return this.word + this.suffix;
	    }
	  }
	
	  var CombinedParse = function(left, right) {
	    this.left = left;
	    this.right = right;
	    this.tag = right.tag;
	    this.score = left.score * right.score * 0.8;
	    this.stutterCnt = left.stutterCnt + right.stutterCnt;
	    this.typosCnt = left.typosCnt + right.typosCnt;
	    if ('formCnt' in right) {
	      this.formCnt = right.formCnt;
	    }
	  }
	
	  CombinedParse.prototype = Object.create(Parse.prototype);
	  CombinedParse.prototype.constructor = CombinedParse;
	
	  CombinedParse.prototype.inflect = function(tag, grammemes) {
	    var left, right;
	
	    var right = this.right.inflect(tag, grammemes);
	    if (!grammemes && typeof tag === 'number') {
	      left = this.left.inflect(right.tag, ['POST', 'NMbr', 'CAse', 'PErs', 'TEns']);
	    } else {
	      left = this.left.inflect(tag, grammemes);
	    }
	    if (left && right) {
	      return new CombinedParse(left, right);
	    } else {
	      return false;
	    }
	  }
	
	  CombinedParse.prototype.toString = function() {
	    return this.left.word + '-' + this.right.word;
	  }
	
	  __init.push(function() {
	    Morph.Parsers.Dictionary = function(word, config) {
	      var isCapitalized =
	        !config.ignoreCase && word.length &&
	        (word[0].toLocaleLowerCase() != word[0]) &&
	        (word.substr(1).toLocaleUpperCase() != word.substr(1));
	      word = word.toLocaleLowerCase();
	
	      var opts = lookup(words, word, config);
	
	      var vars = [];
	      for (var i = 0; i < opts.length; i++) {
	        for (var j = 0; j < opts[i][1].length; j++) {
	          var w = new DictionaryParse(
	            opts[i][0],
	            opts[i][1][j][0],
	            opts[i][1][j][1],
	            opts[i][2],
	            opts[i][3]);
	          if (config.ignoreCase || !w.tag.isCapitalized() || isCapitalized) {
	            vars.push(w);
	          }
	        }
	      }
	      return vars;
	    }
	
	    var abbrTags = [];
	    for (var i = 0; i <= 2; i++) {
	      for (var j = 0; j <= 5; j++) {
	        for (var k = 0; k <= 1; k++) {
	          abbrTags.push(makeTag(
	            'NOUN,inan,' + ['masc', 'femn', 'neut'][i] + ',Fixd,Abbr ' + ['sing', 'plur'][k] + ',' + ['nomn', 'gent', 'datv', 'accs', 'ablt', 'loct'][j],
	            'СУЩ,неод,' + ['мр', 'жр', 'ср'][i] + ',0,аббр ' + ['ед', 'мн'][k] + ',' + ['им', 'рд', 'дт', 'вн', 'тв', 'пр'][j]
	          ));
	        }
	      }
	    }
	
	    // Произвольные аббревиатуры (несклоняемые)
	    // ВК, ЖК, ССМО, ОАО, ЛенСпецСМУ
	    Morph.Parsers.Abbr = function(word, config) {
	      // Однобуквенные считаются инициалами и для них заведены отдельные парсеры
	      if (word.length < 2) {
	        return [];
	      }
	      // Дефисов в аббревиатуре быть не должно
	      if (word.indexOf('-') > -1) {
	        return [];
	      }
	      // Первая буква должна быть заглавной: сокращения с маленькой буквы (типа iOS) мало распространены
	      // Последняя буква должна быть заглавной: иначе сокращение, вероятно, склоняется
	      if ((initials.indexOf(word[0]) > -1) && (initials.indexOf(word[word.length - 1]) > -1)) {
	        var caps = 0;
	        for (var i = 0; i < word.length; i++) {
	          if (initials.indexOf(word[i]) > -1) {
	            caps++;
	          }
	        }
	        if (caps <= 5) {
	          var vars = [];
	          for (var i = 0; i < abbrTags.length; i++) {
	            var w = new Parse(word, abbrTags[i], 0.5);
	            vars.push(w);
	          }
	          return vars;
	        }
	      }
	      // При игнорировании регистра разбираем только короткие аббревиатуры
	      // (и требуем, чтобы каждая буква была «инициалом», т.е. без мягких/твердых знаков)
	      if (!config.ignoreCase || (word.length > 5)) {
	        return [];
	      }
	      word = word.toLocaleUpperCase();
	      for (var i = 0; i < word.length; i++) {
	        if (initials.indexOf(word[i]) == -1) {
	          return [];
	        }
	      }
	      var vars = [];
	      for (var i = 0; i < abbrTags.length; i++) {
	        var w = new Parse(word, abbrTags[i], 0.2);
	        vars.push(w);
	      }
	      return vars;
	    }
	
	    var InitialsParser = function(isPatronymic, score) {
	      var initialsTags = [];
	      for (var i = 0; i <= 1; i++) {
	        for (var j = 0; j <= 5; j++) {
	          initialsTags.push(makeTag(
	            'NOUN,anim,' + ['masc', 'femn'][i] + ',Sgtm,Name,Fixd,Abbr,Init sing,' + ['nomn', 'gent', 'datv', 'accs', 'ablt', 'loct'][j],
	            'СУЩ,од,' + ['мр', 'жр'][i] + ',sg,имя,0,аббр,иниц ед,' + ['им', 'рд', 'дт', 'вн', 'тв', 'пр'][j]
	          ));
	        }
	      }
	      return function(word, config) {
	        if (word.length != 1) {
	          return [];
	        }
	        if (config.ignoreCase) {
	          word = word.toLocaleUpperCase();
	        }
	        if (initials.indexOf(word) == -1) {
	          return [];
	        }
	        var vars = [];
	        for (var i = 0; i < initialsTags.length; i++) {
	          var w = new Parse(word, initialsTags[i], score);
	          vars.push(w);
	        }
	        return vars;
	      }
	    }
	
	    Morph.Parsers.AbbrName = InitialsParser(false, 0.1);
	    Morph.Parsers.AbbrPatronymic = InitialsParser(true, 0.1);
	
	    var RegexpParser = function(regexp, tag, score) {
	      return function(word, config) {
	        if (config.ignoreCase) {
	          word = word.toLocaleUpperCase();
	        }
	        if (word.length && word.match(regexp)) {
	          return [new Parse(word, tag)];
	        } else {
	          return [];
	        }
	      }
	    }
	
	    grammemes['NUMB'] = grammemes['ЧИСЛО'] =
	    grammemes['ROMN'] = grammemes['РИМ'] =
	    grammemes['LATN'] = grammemes['ЛАТ'] =
	    grammemes['PNCT'] = grammemes['ЗПР'] =
	    grammemes['UNKN'] = grammemes['НЕИЗВ'] =
	     { parent: 'POST' };
	
	    Morph.Parsers.IntNumber = RegexpParser(
	      /^[−-]?[0-9]+$/,
	      makeTag('NUMB,intg', 'ЧИСЛО,цел'), 0.9);
	
	    Morph.Parsers.RealNumber = RegexpParser(
	      /^[−-]?([0-9]*[.,][0-9]+)$/,
	      makeTag('NUMB,real', 'ЧИСЛО,вещ'), 0.9);
	
	    Morph.Parsers.Punctuation = RegexpParser(
	      /^[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+$/,
	      makeTag('PNCT', 'ЗПР'), 0.9);
	
	    Morph.Parsers.RomanNumber = RegexpParser(
	      /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
	      makeTag('ROMN', 'РИМ'), 0.9);
	
	    Morph.Parsers.Latin = RegexpParser(
	      /[A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u024f]$/,
	      makeTag('LATN', 'ЛАТ'), 0.9);
	
	    // слово + частица
	    // смотри-ка
	    Morph.Parsers.HyphenParticle = function(word, config) {
	      word = word.toLocaleLowerCase();
	
	      var vars = [];
	      for (var k = 0; k < particles.length; k++) {
	        if (word.substr(word.length - particles[k].length) == particles[k]) {
	          var base = word.slice(0, -particles[k].length);
	          var opts = lookup(words, base, config);
	
	          //console.log(opts);
	          for (var i = 0; i < opts.length; i++) {
	            for (var j = 0; j < opts[i][1].length; j++) {
	              var w = new DictionaryParse(
	                opts[i][0],
	                opts[i][1][j][0],
	                opts[i][1][j][1],
	                opts[i][2],
	                opts[i][3],
	                '', particles[k]);
	              w.score *= 0.9;
	              vars.push(w);
	            }
	          }
	        }
	      }
	
	      return vars;
	    }
	
	    var ADVB = makeTag('ADVB', 'Н');
	
	    // 'по-' + прилагательное в дательном падеже
	    // по-западному
	    Morph.Parsers.HyphenAdverb = function(word, config) {
	      word = word.toLocaleLowerCase();
	
	      if ((word.length < 5) || (word.substr(0, 3) != 'по-')) {
	        return [];
	      }
	
	      var opts = lookup(words, word.substr(3), config);
	
	      var parses = [];
	      var used = {};
	
	      for (var i = 0; i < opts.length; i++) {
	        if (!used[opts[i][0]]) {
	          for (var j = 0; j < opts[i][1].length; j++) {
	            var parse = new DictionaryParse(opts[i][0], opts[i][1][j][0], opts[i][1][j][1], opts[i][2], opts[i][3]);
	            if (parse.matches(['ADJF', 'sing', 'datv'])) {
	              used[opts[i][0]] = true;
	
	              parse = new Parse('по-' + opts[i][0], ADVB, parse.score * 0.9, opts[i][2], opts[i][3]);
	              parses.push(parse);
	              break;
	            }
	          }
	        }
	      }
	      return parses;
	    }
	
	    // слово + '-' + слово
	    // интернет-магазин
	    // компания-производитель
	    Morph.Parsers.HyphenWords = function(word, config) {
	      word = word.toLocaleLowerCase();
	      for (var i = 0; i < knownPrefixes.length; i++) {
	        if (knownPrefixes[i][knownPrefixes[i].length - 1] == '-' &&
	            word.substr(0, knownPrefixes[i].length) == knownPrefixes[i]) {
	          return [];
	        }
	      }
	      var parses = [];
	      var parts = word.split('-');
	      if (parts.length != 2 || !parts[0].length || !parts[1].length) {
	        if (parts.length > 2) {
	          var end = parts[parts.length - 1];
	          var right = Morph.Parsers.Dictionary(end, config);
	          for (var j = 0; j < right.length; j++) {
	            if (right[j] instanceof DictionaryParse) {
	              right[j].score *= 0.2;
	              right[j].prefix = word.substr(0, word.length - end.length - 1) + '-';
	              parses.push(right[j]);
	            }
	          }
	        }
	        return parses;
	      }
	      var left = Morph.Parsers.Dictionary(parts[0], config);
	      var right = Morph.Parsers.Dictionary(parts[1], config);
	
	
	      // Variable
	      for (var i = 0; i < left.length; i++) {
	        if (left[i].tag.Abbr) {
	          continue;
	        }
	        for (var j = 0; j < right.length; j++) {
	          if (!left[i].matches(right[j], ['POST', 'NMbr', 'CAse', 'PErs', 'TEns'])) {
	            continue;
	          }
	          if (left[i].stutterCnt + right[j].stutterCnt > config.stutter ||
	              left[i].typosCnt + right[j].typosCnt > config.typos) {
	            continue;
	          }
	          parses.push(new CombinedParse(left[i], right[j]));
	        }
	      }
	      // Fixed
	      for (var j = 0; j < right.length; j++) {
	        if (right[j] instanceof DictionaryParse) {
	          right[j].score *= 0.3;
	          right[j].prefix = parts[0] + '-';
	          parses.push(right[j]);
	        }
	      }
	
	      return parses;
	    }
	
	
	    Morph.Parsers.PrefixKnown = function(word, config) {
	      var isCapitalized =
	        !config.ignoreCase && word.length &&
	        (word[0].toLocaleLowerCase() != word[0]) &&
	        (word.substr(1).toLocaleUpperCase() != word.substr(1));
	      word = word.toLocaleLowerCase();
	      var parses = [];
	      for (var i = 0; i < knownPrefixes.length; i++) {
	        if (word.length - knownPrefixes[i].length < 3) {
	          continue;
	        }
	
	        if (word.substr(0, knownPrefixes[i].length) == knownPrefixes[i]) {
	          var end = word.substr(knownPrefixes[i].length);
	          var right = Morph.Parsers.Dictionary(end, config);
	          for (var j = 0; j < right.length; j++) {
	            if (!right[j].tag.isProductive()) {
	              continue;
	            }
	            if (!config.ignoreCase && right[j].tag.isCapitalized() && !isCapitalized) {
	              continue;
	            }
	            right[j].score *= 0.7;
	            right[j].prefix = knownPrefixes[i];
	            parses.push(right[j]);
	          }
	        }
	      }
	      return parses;
	    }
	
	    Morph.Parsers.PrefixUnknown = function(word, config) {
	      var isCapitalized =
	        !config.ignoreCase && word.length &&
	        (word[0].toLocaleLowerCase() != word[0]) &&
	        (word.substr(1).toLocaleUpperCase() != word.substr(1));
	      word = word.toLocaleLowerCase();
	      var parses = [];
	      for (var len = 1; len <= 5; len++) {
	        if (word.length - len < 3) {
	          break;
	        }
	        var end = word.substr(len);
	        var right = Morph.Parsers.Dictionary(end, config);
	        for (var j = 0; j < right.length; j++) {
	          if (!right[j].tag.isProductive()) {
	            continue;
	          }
	          if (!config.ignoreCase && right[j].tag.isCapitalized() && !isCapitalized) {
	            continue;
	          }
	          right[j].score *= 0.3;
	          right[j].prefix = word.substr(0, len);
	          parses.push(right[j]);
	        }
	      }
	      return parses;
	    }
	
	    // Отличие от предсказателя по суффиксам в pymorphy2: найдя подходящий суффикс, проверяем ещё и тот, что на символ короче
	    Morph.Parsers.SuffixKnown = function(word, config) {
	      if (word.length < 4) {
	        return [];
	      }
	      var isCapitalized =
	        !config.ignoreCase && word.length &&
	        (word[0].toLocaleLowerCase() != word[0]) &&
	        (word.substr(1).toLocaleUpperCase() != word.substr(1));
	      word = word.toLocaleLowerCase();
	      var parses = [];
	      var minlen = 1;
	      var coeffs = [0, 0.2, 0.3, 0.4, 0.5, 0.6];
	      var used = {};
	      for (var i = 0; i < prefixes.length; i++) {
	        if (prefixes[i].length && (word.substr(0, prefixes[i].length) != prefixes[i])) {
	          continue;
	        }
	        var base = word.substr(prefixes[i].length);
	        for (var len = 5; len >= minlen; len--) {
	          if (len >= base.length) {
	            continue;
	          }
	          var left = base.substr(0, base.length - len);
	          var right = base.substr(base.length - len);
	          var entries = predictionSuffixes[i].findAll(right, config.replacements, 0, 0);
	          if (!entries) {
	            continue;
	          }
	
	          var p = [];
	          var max = 1;
	          for (var j = 0; j < entries.length; j++) {
	            var suffix = entries[j][0];
	            var stats = entries[j][1];
	
	            for (var k = 0; k < stats.length; k++) {
	              var parse = new DictionaryParse(
	                prefixes[i] + left + suffix,
	                stats[k][1],
	                stats[k][2]);
	              // Why there is even non-productive forms in suffix DAWGs?
	              if (!parse.tag.isProductive()) {
	                continue;
	              }
	              if (!config.ignoreCase && parse.tag.isCapitalized() && !isCapitalized) {
	                continue;
	              }
	              var key = parse.toString() + ':' + stats[k][1] + ':' + stats[k][2];
	              if (key in used) {
	                continue;
	              }
	              max = Math.max(max, stats[k][0]);
	              parse.score = stats[k][0] * coeffs[len];
	              p.push(parse);
	              used[key] = true;
	            }
	          }
	          if (p.length > 0) {
	            for (var j = 0; j < p.length; j++) {
	              p[j].score /= max;
	            }
	            parses = parses.concat(p);
	            // Check also suffixes 1 letter shorter
	            minlen = Math.max(len - 1, 1);
	          }
	        }
	      }
	      return parses;
	    }
	
	    UNKN = makeTag('UNKN', 'НЕИЗВ');
	  });
	
	  /**
	   * Задает опции морфологического анализатора по умолчанию.
	   *
	   * @param {Object} config Опции анализатора.
	   * @see Morph
	   */
	  Morph.setDefaults = function(config) {
	    defaults = config;
	  }
	
	  /**
	   * Инициализирует анализатор, загружая необходимые для работы словари из
	   * указанной директории. Эту функцию необходимо вызвать (и дождаться
	   * срабатывания коллбэка) до любых действий с модулем.
	   *
	   * @param {string} [path] Директория, содержащая файлы 'words.dawg',
	   * 'grammemes.json' и т.д. По умолчанию директория 'dicts' в данном модуле.
	   * @param {Function} callback Коллбэк, вызываемый после завершения загрузки
	   *  всех словарей.
	   */
	  Morph.init = function(path, callback) {
	    var loading = 0;
	    var tagsInt, tagsExt;
	    function loaded() {
	      if (!--loading) {
	        tags = Array(tagsInt.length);
	        for (var i = 0; i < tagsInt.length; i++) {
	          tags[i] = new Tag(tagsInt[i]);
	          tags[i].ext = new Tag(tagsExt[i]);
	        }
	        tags = deepFreeze(tags);
	        for (var i = 0; i < __init.length; i++) {
	          __init[i]();
	        }
	        initialized = true;
	        callback && callback(null, Morph);
	      }
	    }
	
	    if (!callback && typeof path == 'function') {
	      callback = path;
	      if (true) {
	        path = __dirname + '/../dicts';
	      } else {
	        path = 'dicts';
	      }
	    }
	
	    loading++;
	    Az.DAWG.load(path + '/words.dawg', 'words', function(err, dawg) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      words = dawg;
	      loaded();
	    });
	
	    for (var prefix = 0; prefix < 3; prefix++) {
	      (function(prefix) {
	        loading++;
	        Az.DAWG.load(path + '/prediction-suffixes-' + prefix + '.dawg', 'probs', function(err, dawg) {
	          if (err) {
	            callback(err);
	            return;
	          }
	          predictionSuffixes[prefix] = dawg;
	          loaded();
	        });
	      })(prefix);
	    }
	
	    loading++;
	    Az.DAWG.load(path + '/p_t_given_w.intdawg', 'int', function(err, dawg) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      probabilities = dawg;
	      loaded();
	    });
	
	    loading++;
	    Az.load(path + '/grammemes.json', 'json', function(err, json) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      grammemes = {};
	      for (var i = 0; i < json.length; i++) {
	        grammemes[json[i][0]] = grammemes[json[i][2]] = {
	          parent: json[i][1],
	          internal: json[i][0],
	          external: json[i][2],
	          externalFull: json[i][3]
	        }
	      }
	      loaded();
	    });
	
	    loading++;
	    Az.load(path + '/gramtab-opencorpora-int.json', 'json', function(err, json) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      tagsInt = json;
	      loaded();
	    });
	
	    loading++;
	    Az.load(path + '/gramtab-opencorpora-ext.json', 'json', function(err, json) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      tagsExt = json;
	      loaded();
	    });
	
	    loading++;
	    Az.load(path + '/suffixes.json', 'json', function(err, json) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      suffixes = json;
	      loaded();
	    });
	
	    loading++;
	    Az.load(path + '/paradigms.array', 'arraybuffer', function(err, data) {
	      if (err) {
	        callback(err);
	        return;
	      }
	      
	      var list = new Uint16Array(data),
	          count = list[0],
	          pos = 1;
	
	      paradigms = [];
	      for (var i = 0; i < count; i++) {
	        var size = list[pos++];
	        paradigms.push(list.subarray(pos, pos + size));
	        pos += size;
	      }
	      loaded();
	    });
	  }
	
	  return Morph;
	}));
	
	;(function (global, factory) {
	   true ? (module.exports = module.exports || {}) && (module.exports.Syntax = factory(module.exports)) :
	  typeof define === 'function' && define.amd ? define('Az.Syntax', ['Az'], factory) :
	  (global.Az = global.Az || {}) && (global.Az.Syntax = factory(global.Az))
	}(this, function (Az) { 'use strict';
	  // TBD: Syntax analyzer
	  var Syntax = function() {
	
	  }
	
	  return Syntax;
	}));
	;(function (global, factory) {
	   true ? (module.exports = module.exports || {}) && (module.exports.Tokens = factory()) :
	  typeof define === 'function' && define.amd ? define('Az.Tokens', ['Az'], factory) :
	  (global.Az = global.Az || {}) && (global.Az.Tokens = factory())
	}(this, function () { 'use strict';
	  /** @namespace Az **/
	  var TLDs = 'ac|ad|ae|aero|af|ag|ai|al|am|ao|aq|ar|arpa|as|asia|at|au|aw|ax|az|ba|bb|be|bf|bg|bh|bi|biz|bj|bm|bo|br|bs|bt|bv|bw|by|bz|ca|cat|cc|cd|cf|cg|ch|ci|cl|cm|cn|co|com|coop|cr|cu|cv|cw|cx|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|es|et|eu|fi|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|info|int|io|iq|ir|is|it|je|jo|jobs|jp|kg|ki|km|kn|kp|kr|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mn|mo|mobi|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|na|name|nc|ne|net|nf|ng|nl|no|nr|nu|nz|om|org|pa|pe|pf|ph|pk|pl|pm|pn|post|pr|pro|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tr|travel|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|yt|امارات|հայ|বাংলা|бел|中国|中國|الجزائر|مصر|ею|გე|ελ|香港|भारत|بھارت|భారత్|ભારત|ਭਾਰਤ|ভারত|இந்தியா|ایران|ايران|عراق|الاردن|한국|қаз|ලංකා|இலங்கை|المغرب|мкд|мон|澳門|澳门|مليسيا|عمان|پاکستان|پاكستان|فلسطين|срб|рф|قطر|السعودية|السعودیة|السعودیۃ|السعوديه|سودان|新加坡|சிங்கப்பூர்|سورية|سوريا|ไทย|تونس|台灣|台湾|臺灣|укр|اليمن|xxx|zm|aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|academy|accenture|accountant|accountants|aco|active|actor|adac|ads|adult|aeg|aetna|afamilycompany|afl|africa|africamagic|agakhan|agency|aig|aigo|airbus|airforce|airtel|akdn|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|aol|apartments|app|apple|aquarelle|arab|aramco|archi|army|art|arte|asda|associates|athleta|attorney|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aws|axa|azure|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bbc|bbt|bbva|bcg|bcn|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bharti|bible|bid|bike|bing|bingo|bio|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bms|bmw|bnl|bnpparibas|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|bradesco|bridgestone|broadway|broker|brother|brussels|budapest|bugatti|build|builders|business|buy|buzz|bzh|cab|cafe|cal|call|calvinklein|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|catering|catholic|cba|cbn|cbre|cbs|ceb|center|ceo|cern|cfa|cfd|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|coach|codes|coffee|college|cologne|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|corsica|country|coupon|coupons|courses|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cuisinella|cymru|cyou|dabur|dad|dance|date|dating|datsun|day|dclk|dds|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dnp|docs|dodge|dog|doha|domains|dot|download|drive|dstv|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dwg|earth|eat|edeka|education|email|emerck|emerson|energy|engineer|engineering|enterprises|epost|epson|equipment|ericsson|erni|esq|estate|esurance|etisalat|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|flickr|flights|flir|florist|flowers|flsmidth|fly|foo|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|gal|gallery|gallo|gallup|game|games|gap|garden|gbiz|gdn|gea|gent|genting|george|ggee|gift|gifts|gives|giving|glade|glass|gle|global|globo|gmail|gmbh|gmo|gmx|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gotv|grainger|graphics|gratis|green|gripe|group|guardian|gucci|guge|guide|guitars|guru|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hkt|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|host|hosting|hot|hoteles|hotmail|house|how|hsbc|htc|hughes|hyatt|hyundai|ibm|icbc|ice|icu|ieee|ifm|iinet|ikano|imamat|imdb|immo|immobilien|industries|infiniti|ing|ink|institute|insurance|insure|intel|international|intuit|investments|ipiranga|irish|iselect|ismaili|ist|istanbul|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|jeep|jetzt|jewelry|jio|jlc|jll|jmp|jnj|joburg|jot|joy|jpmorgan|jprs|juegos|juniper|kaufen|kddi|kerryhotels|kerrylogistics|kerryproperties|kfh|kia|kim|kinder|kindle|kitchen|kiwi|koeln|komatsu|kosher|kpmg|kpn|krd|kred|kuokgroup|kyknet|kyoto|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|ltd|ltda|lundbeck|lupin|luxe|luxury|macys|madrid|maif|maison|makeup|man|management|mango|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mcd|mcdonalds|mckinsey|med|media|meet|melbourne|meme|memorial|men|menu|meo|metlife|miami|microsoft|mini|mint|mit|mitsubishi|mlb|mls|mma|mnet|mobily|moda|moe|moi|mom|monash|money|monster|montblanc|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|msd|mtn|mtpc|mtr|multichoice|mutual|mutuelle|mzansimagic|nab|nadex|nagoya|naspers|nationwide|natura|navy|nba|nec|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nfl|ngo|nhk|nico|nike|nikon|ninja|nissan|nissay|nokia|northwesternmutual|norton|now|nowruz|nowtv|nra|nrw|ntt|nyc|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|organic|orientexpress|origins|osaka|otsuka|ott|ovh|page|pamperedchef|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|payu|pccw|pet|pfizer|pharmacy|philips|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|place|play|playstation|plumbing|plus|pnc|pohl|poker|politie|porn|pramerica|praxi|press|prime|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|pub|pwc|qpon|quebec|quest|qvc|racing|raid|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|rocher|rocks|rodeo|rogers|room|rsvp|ruhr|run|rwe|ryukyu|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sbi|sbs|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shopping|shouji|show|showtime|shriram|silk|sina|singles|site|ski|skin|sky|skype|sling|smart|smile|sncf|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|srl|srt|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|sucks|supersport|supplies|supply|support|surf|surgery|suzuki|swatch|swiftcover|swiss|sydney|symantec|systems|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tci|tdk|team|tech|technology|telecity|telefonica|temasek|tennis|teva|thd|theater|theatre|theguardian|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tjmaxx|tjx|tkmaxx|tmall|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|trade|trading|training|travelchannel|travelers|travelersinsurance|trust|trv|tube|tui|tunes|tushu|tvs|ubank|ubs|uconnect|unicom|university|uno|uol|ups|vacations|vana|vanguard|vegas|ventures|verisign|versicherung|vet|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vodka|volkswagen|volvo|vote|voting|voto|voyage|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|कॉम|セール|佛山|慈善|集团|在线|大众汽车|点看|คอม|八卦|موقع|一号店|公益|公司|香格里拉|网站|移动|我爱你|москва|католик|онлайн|сайт|联通|קום|时尚|微博|淡马锡|ファッション|орг|नेट|ストア|삼성|商标|商店|商城|дети|ポイント|新闻|工行|家電|كوم|中文网|中信|娱乐|谷歌|電訊盈科|购物|クラウド|通販|网店|संगठन|餐厅|网络|ком|诺基亚|食品|飞利浦|手表|手机|ارامكو|العليان|اتصالات|بازار|موبايلي|ابوظبي|كاثوليك|همراه|닷컴|政府|شبكة|بيتك|عرب|机构|组织机构|健康|рус|珠宝|大拿|みんな|グーグル|世界|書籍|网址|닷넷|コム|天主教|游戏|vermögensberater|vermögensberatung|企业|信息|嘉里大酒店|嘉里|广东|政务|xperia|xyz|yachts|yahoo|yamaxun|yandex|yodobashi|yoga|yokohama|you|youtube|yun|zappos|zara|zero|zip|zippo|zone|zuerich'.split('|');
	  var defaults = {
	    html: false,
	    wiki: false,       // TODO: check all cases
	    markdown: false,   // TODO: check all cases
	    hashtags: true,
	    mentions: true,
	    emails: true,
	    links: {
	      protocols: true,
	      www: false,
	      tlds: {}
	    }
	  };
	  /* TODO: add more named HTML entities */
	  var HTML_ENTITIES = { nbsp: ' ', quot: '"', gt: '>', lt: '<', amp: '&', ndash: '–' };
	
	  for (var i = 0; i < TLDs.length; i++) {
	    defaults.links.tlds[TLDs[i]] = true;
	  }
	
	  /**
	   * Токен, соответствующий некоторой подстроке в представленном на вход тексте.
	   *
	   * @constructor
	   * @property {string} type Тип токена.
	   * @property {string} subType Подтип токена.
	   * @property {number} st Индекс первого символа, входящего в токен.
	   * @property {number} en Индекс последнего символа, входящего в токен.
	   * @property {number} length Длина токена.
	   * @property {boolean} firstUpper True, если первый символ токена является заглавной буквой.
	   * @property {boolean} allUpper True, если все символы в токене являются заглавными буквами.
	   */
	  var Token = function(source, st, length, index, firstUpper, allUpper, type, subType) {
	    this.source = source;
	    this.st = st;
	    this.length = length;
	    this.index = index;
	    this.firstUpper = firstUpper;
	    this.allUpper = allUpper;
	    this.type = type;
	    if (subType) {
	      this.subType = subType;
	    }
	  }
	  Token.prototype.toString = function() {
	    return (('_str' in this) && (this._str.length == this.length)) ? this._str : (this._str = this.source.substr(this.st, this.length));
	  }
	  Token.prototype.indexOf = function(str) {
	    if (str.length == 1) {
	      for (var i = 0; i < this.length; i++) {
	        if (this.source[this.st + i] == str) {
	          return i;
	        }
	      }
	      return -1;
	    }
	    return this.toString().indexOf(str);
	  }
	  Token.prototype.toLowerCase = function() {
	    return this.toString().toLocaleLowerCase();
	  }
	  Token.prototype.isCapitalized = function() {
	    return this.firstUpper && !this.allUpper;
	  }
	  Token.prototype.en = function() {
	    return this.st + this.length - 1;
	  }
	
	  /**
	   * Создает токенизатор текста с заданными опциями.
	   *
	   * @playground
	   * var Az = require('az');
	   * var tokens = Az.Tokens('Текст (от лат. textus — «ткань; сплетение, связь, паутина, сочетание») — зафиксированная на каком-либо материальном носителе человеческая мысль; в общем плане связная и полная последовательность символов.');
	   * tokens.done();
	   * @constructor
	   * @param {string} [text] Строка для разбивки на токены.
	   * @param {Object} [config] Опции, применяемые при разбивке.
	   * @param {boolean} [config.html=False] Распознавать и выделять в отдельные
	   *  токены (типа TAG) HTML-теги. Кроме того, содержимое тегов &lt;style&gt;
	   *  и &lt;script&gt; будет размечено как единый токен типа CONTENT.
	   * @param {boolean} [config.wiki=False] Распознавать и выделять в отдельные
	   *  токены элементы вики-разметки.
	   * @param {boolean} [config.markdown=False] Распознавать и выделять в отдельные
	   *  токены элементы Markdown-разметки.
	   * @param {boolean} [config.hashtags=True] Распознавать и выделять в отдельные
	   *  токены хэштеги (строки, начинающиеся с символа «#»).
	   * @param {boolean} [config.mentions=True] Распознавать и выделять в отдельные
	   *  токены упоминания (строки, начинающиеся с символа «@»).
	   * @param {boolean} [config.emails=True] Распознавать и выделять в отдельные
	   *  токены е-мейлы (нет, распознавание всех корректных по RFC адресов не
	   *  гарантируется).
	   * @param {Object} [config.links] Настройки распознавания ссылок. False, чтобы
	   *  не распознавать ссылки совсем.
	   * @param {boolean} [config.links.protocols=True] Распознавать и выделять в отдельные
	   *  токены ссылки с указанным протоколом (http://, https:// и вообще любым другим).
	   * @param {boolean} [config.links.www=False] Распознавать и выделять в отдельные
	   *  токены ссылки, начинающиеся с «www.».
	   * @param {Object} [config.links.tlds] Объект, в котором ключами должны быть
	   *  домены верхнего уровня, в которых будут распознаваться ссылки. По умолчанию
	   *  текущий список всех таких доменов.
	   * @memberof Az
	   */
	  var Tokens = function(text, config) {
	    if (this instanceof Tokens) {
	      this.tokens = [];
	      this.source = '';
	      if (typeof text == 'string') {
	        this.config = config ? Az.extend(defaults, config) : defaults;
	        this.append(text);
	      } else {
	        this.config = text ? Az.extend(defaults, text) : defaults;
	      }
	      this.index = -1;
	    } else {
	      return new Tokens(text, config);
	    }
	  }
	
	  Tokens.WORD = new String('WORD');
	  Tokens.NUMBER = new String('NUMBER');
	  Tokens.OTHER = new String('OTHER');
	  Tokens.DIGIT = new String('DIGIT');
	  Tokens.CYRIL = new String('CYRIL');
	  Tokens.LATIN = new String('LATIN');
	  Tokens.MIXED = new String('MIXED');
	  Tokens.PUNCT = new String('PUNCT');
	  Tokens.SPACE = new String('SPACE');
	  Tokens.MARKUP = new String('MARKUP');
	  Tokens.NEWLINE = new String('NEWLINE');
	  Tokens.EMAIL = new String('EMAIL');
	  Tokens.LINK = new String('LINK');
	  Tokens.HASHTAG = new String('HASHTAG');
	  Tokens.MENTION = new String('MENTION');
	  Tokens.TAG = new String('TAG');
	  Tokens.CONTENT = new String('CONTENT');
	  Tokens.SCRIPT = new String('SCRIPT');
	  Tokens.STYLE = new String('STYLE');
	  Tokens.COMMENT = new String('COMMENT');
	  Tokens.CLOSING = new String('CLOSING');
	  Tokens.TEMPLATE = new String('TEMPLATE');
	  Tokens.RANGE = new String('RANGE');
	  Tokens.ENTITY = new String('ENTITY');
	
	  /**
	   * Отправляет ещё один кусок текста на токенизацию. Таким образом вполне
	   * допустимо обрабатывать большие документы частями, многократно вызывая этот
	   * метод. При этом токен может начаться в одной части и продолжиться в
	   * следующей (а закончиться в ещё одной).
	   *
	   * @param {string} text Строка для разбивки на токены.
	   * @param {Object} [config] Опции, применяемые при разбивке. Перекрывают
	   *  опции, заданные в конструкторе токенизатора.
	   * @see Tokens
	   */
	  Tokens.prototype.append = function(text, config) {
	    'use strict';
	    // Для производительности:
	    // - как можно меньше операций конкатенции/разбивки строк
	    // - вместо сравнения всего токена, проверяем соответствующий ему символ в исходной строке
	    // - типы токенов - константы в Tokens, формально это строки, но сравниваем через === (как объекты)
	    config = config ? Az.extend(this.config, config) : this.config;
	    if (config.links && (config.links.tlds === true)) {
	      config.links.tlds = defaults.links.tlds;
	    }
	
	    var offs = this.source.length;
	    this.source += text;
	    
	    var s = this.source, ts = this.tokens;
	    for (var i = offs; i < s.length; i++) {
	      var ch = s[i];
	      var code = s.charCodeAt(i);
	
	      var append = false;
	      var last = ts.length - 1;
	      var token = ts[last];
	      var st = i;
	
	      if (config.html && (ch == ';')) {
	        // &nbsp;
	        if ((last > 0) && 
	            (token.type === Tokens.WORD) && 
	            (ts[last - 1].length == 1) && 
	            (s[ts[last - 1].st] == '&')) {
	          var name = token.toLowerCase();
	          if (name in HTML_ENTITIES) {
	            ch = HTML_ENTITIES[name];
	            code = ch.charCodeAt(0);
	
	            last -= 2;
	            token = ts[last];
	            ts.length = last + 1;
	          }
	        } else
	        // &x123AF5;
	        // &1234;
	        if ((last > 1) && 
	            ((token.type === Tokens.NUMBER) || 
	             ((token.type === Tokens.WORD) &&
	              (s[token.st] == 'x'))) && 
	            (ts[last - 1].length == 1) &&
	            (s[ts[last - 1].st] == '#') && 
	            (ts[last - 1].length == 1) &&
	            (s[ts[last - 1].st] == '&')) {
	          if (s[token.st] == 'x') {
	            code = parseInt(token.toString().substr(1), 16);
	          } else {
	            code = parseInt(token.toString(), 10);
	          }
	          ch = String.fromCharCode(code);
	
	          last -= 3;
	          token = ts[last];
	          ts.length = last + 1;
	        }
	      }
	
	      var charType = Tokens.OTHER;
	      var charUpper = (ch.toLocaleLowerCase() != ch);
	      if (code >= 0x0400 && code <= 0x04FF) charType = Tokens.CYRIL;
	      if ((code >= 0x0041 && code <= 0x005A) || (code >= 0x0061 && code <= 0x007A) || (code >= 0x00C0 && code <= 0x024F)) charType = Tokens.LATIN;
	      if (code >= 0x0030 && code <= 0x0039) charType = Tokens.DIGIT;
	      if ((code <= 0x0020) || (code >= 0x0080 && code <= 0x00A0)) charType = Tokens.SPACE;
	      if ('‐-−‒–—―.…,:;?!¿¡()[]«»"\'’‘’“”/⁄'.indexOf(ch) > -1) charType = Tokens.PUNCT;
	
	      var tokenType = charType;
	      var tokenSubType = false;
	      if (charType === Tokens.CYRIL || charType === Tokens.LATIN) {
	        tokenType = Tokens.WORD;
	        tokenSubType = charType;
	      } else
	      if (charType === Tokens.DIGIT) {
	        tokenType = Tokens.NUMBER;
	      }
	
	      var lineStart = !token || (s[token.st + token.length - 1] == '\n');
	
	      if (config.wiki) {
	        if (lineStart) {
	          if (':;*#~|'.indexOf(ch) > -1) {
	            tokenType = Tokens.MARKUP;
	            tokenSubType = Tokens.NEWLINE;
	          }
	        }
	        if ('={[|]}'.indexOf(ch) > -1) {
	          tokenType = Tokens.MARKUP;
	        }
	      }
	
	      if (config.markdown) {
	        if (lineStart) {
	          if ('=-#>+-'.indexOf(ch) > -1) {
	            tokenType = Tokens.MARKUP;
	            tokenSubType = Tokens.NEWLINE;
	          }
	        }
	        if ('[]*~_`\\'.indexOf(ch) > -1) {
	          tokenType = Tokens.MARKUP;
	        }
	      }
	
	      if (token) {
	        if (config.wiki && 
	            (ch != "'") && 
	            (token.length == 1) &&
	            (s[token.st] == "'") &&
	            (last > 0) &&
	            (ts[last - 1].type === Tokens.WORD) &&
	            (ts[last - 1].subType === Tokens.LATIN)) {
	          ts[last - 1].length += token.length;
	
	          last -= 1;
	          ts.length = last + 1;
	          token = ts[last];
	        }
	
	        // Preprocess last token
	        if (config.links && 
	            config.links.tlds &&
	            ((charType === Tokens.PUNCT) || 
	             (charType === Tokens.SPACE)) &&
	            (ts.length > 2) &&
	            (ts[last - 2].type === Tokens.WORD) &&
	            (ts[last - 1].length == 1) &&
	            (s[ts[last - 1].st] == '.') &&
	            (ts[last].type === Tokens.WORD) &&
	            (token.toString() in config.links.tlds)) {
	
	          // Merge all subdomains
	          while ((last >= 2) &&
	                 (ts[last - 2].type === Tokens.WORD) &&
	                 (ts[last - 1].length == 1) &&
	                 ((s[ts[last - 1].st] == '.') || 
	                  (s[ts[last - 1].st] == '@') || 
	                  (s[ts[last - 1].st] == ':'))) {
	            last -= 2;
	            token = ts[last];
	            token.length += ts[last + 1].length + ts[last + 2].length;
	            token.allUpper = token.allUpper && ts[last + 1].allUpper && ts[last + 2].allUpper;
	          }
	
	          if (config.emails && 
	              (token.indexOf('@') > -1) && 
	              (token.indexOf(':') == -1)) {
	            // URL can contain a '@' but in that case it should be in form http://user@site.com or user:pass@site.com
	            // So if URL has a '@' but no ':' in it, we assume it's a email
	            token.type = Tokens.EMAIL;
	          } else {
	            token.type = Tokens.LINK;
	
	            if (ch == '/') {
	              append = true;
	            }
	          }
	          ts.length = last + 1;
	        } else
	
	        // Process next char (start new token or append to the previous one)
	        if (token.type === Tokens.LINK) {
	          if ((ch == ')') && 
	              (last >= 1) && 
	              (ts[last - 1].type === Tokens.MARKUP) &&
	              (ts[last - 1].length == 1) &&
	              (s[ts[last - 1].st] == '(')) {
	            tokenType = Tokens.MARKUP;
	          } else
	          if ((charType !== Tokens.SPACE) && (ch != ',') && (ch != '<')) {
	            append = true;
	          }
	        } else
	        if (token.type === Tokens.EMAIL) {
	          if ((charType === Tokens.CYRIL) || (charType === Tokens.LATIN) || (ch == '.')) {
	            append = true;
	          }
	        } else
	        if ((token.type === Tokens.HASHTAG) || (token.type === Tokens.MENTION)) {
	          if ((charType === Tokens.CYRIL) || 
	              (charType == Tokens.LATIN) || 
	              (charType == Tokens.DIGIT) || 
	              (ch == '_') || ((ch == '@') && (token.indexOf('@') == -1))) {
	            append = true;
	          }
	        } else
	        if ((token.type === Tokens.TAG) && (token.quote || (s[token.en()] != '>'))) {
	          append = true;
	          if (token.quote) {
	            if ((ch == token.quote) && (s[token.en()] != '\\')) {
	              delete token.quote;
	            }
	          } else
	          if ((ch == '"') || (ch == "'")) {
	            token.quote = ch;
	          }
	        } else
	        if (token.type === Tokens.CONTENT) {
	          append = true;
	          if (token.quote) {
	            if ((ch == token.quote) && (s[token.en()] != '\\')) {
	              delete token.quote;
	            }
	          } else
	          if ((ch == '"') || (ch == "'")) {
	            token.quote = ch;
	          } else
	          if (ch == '>') {
	            if ((token.length >= 8) && (token.toString().substr(-8) == '</script')) {
	              token.length -= 8;
	              st -= 8;
	
	              append = false;
	              tokenType = Tokens.TAG;
	              tokenSubType = Tokens.CLOSING;
	            } else 
	            if ((token.length >= 7) && (token.toString().substr(-7) == '</style')) {
	              token.length -= 7;
	              st -= 7;
	
	              append = false;
	              tokenType = Tokens.TAG;
	              tokenSubType = Tokens.CLOSING;
	            } 
	          }
	        } else
	        if ((token.type === Tokens.TAG) && 
	            (token.type !== Tokens.CLOSING) &&
	            (token.length >= 8) &&
	            (token.toLowerCase().substr(1, 6) == 'script')) {
	          tokenType = Tokens.CONTENT;
	          tokenSubType = Tokens.SCRIPT;
	        } else
	        if ((token.type === Tokens.TAG) && 
	            (token.type !== Tokens.CLOSING) &&
	            (token.length >= 7) && 
	            (token.toLowerCase().substr(1, 5) == 'style')) {
	          tokenType = Tokens.CONTENT;
	          tokenSubType = Tokens.STYLE;
	        } else
	        if (config.html && 
	            (token.length == 1) &&
	            (s[token.st] == '<') && 
	            ((charType === Tokens.LATIN) || (ch == '!') || (ch == '/'))) {
	          append = true;
	          token.type = Tokens.TAG;
	          if (ch == '!') {
	            token.subType = Tokens.COMMENT;
	          } else
	          if (ch == '/') {
	            token.subType = Tokens.CLOSING;
	          }
	        } else
	        if (token.type === Tokens.CONTENT) {
	          append = true;
	        } else
	        if ((token.type === Tokens.MARKUP) && 
	            (token.subType == Tokens.TEMPLATE) && 
	            ((s[token.en()] != '}') || 
	             (s[token.en() - 1] != '}'))) {
	          append = true;
	        } else
	        if ((token.type === Tokens.MARKUP) && 
	            (token.type === Tokens.LINK) && 
	            (s[token.en()] != ')')) {
	          append = true;
	        } else
	        if ((token.type === Tokens.MARKUP) && 
	            (s[token.st] == '`') && 
	            (token.subType === Tokens.NEWLINE) &&
	            (charType === Tokens.LATIN)) {
	          append = true;
	        } else
	        if ((charType === Tokens.CYRIL) || (charType === Tokens.LATIN)) {
	          if (token.type === Tokens.WORD) {
	            append = true;
	            token.subType = (token.subType == charType) ? token.subType : Tokens.MIXED;
	          } else
	          if (token.type === Tokens.NUMBER) { // Digits + ending
	            append = true;
	            token.subType = (token.subType && token.subType != charType) ? Tokens.MIXED : charType;
	          } else
	          if (config.hashtags && (token.length == 1) && (s[token.st] == '#')) { // Hashtags
	            append = true;
	            token.type = Tokens.HASHTAG;
	          } else
	          if (config.mentions && 
	              (token.length == 1) && 
	              (s[token.st] == '@') && 
	              ((last == 0) || (ts[last - 1].type === Tokens.SPACE))) { // Mentions
	            append = true;
	            token.type = Tokens.MENTION;
	          } else
	          if ((charType === Tokens.LATIN) && 
	              (token.length == 1) && 
	              ((s[token.st] == "'") || (s[token.st] == '’'))) {
	            append = true;
	            token.type = Tokens.WORD;
	            token.subType = Tokens.LATIN;
	          } else
	          if ((token.length == 1) && (s[token.st] == '-')) { // -цать (?), 3-й
	            append = true;
	
	            if ((last > 0) && (ts[last - 1].type === Tokens.NUMBER)) {
	              token = ts[last - 1];
	              token.length += ts[last].length;
	
	              ts.length -= 1;
	            }
	
	            token.type = Tokens.WORD;
	            token.subType = charType;
	          }
	        } else
	        if (charType === Tokens.DIGIT) {
	          if (token.type === Tokens.WORD) {
	            append = true;
	            token.subType = Tokens.MIXED;
	          } else
	          if (token.type === Tokens.NUMBER) {
	            append = true;
	          } else
	          if ((token.length == 1) &&
	              ((s[token.st] == '+') || (s[token.st] == '-'))) {
	            append = true;
	
	            if ((last > 0) && (ts[last - 1].type === Tokens.NUMBER)) {
	              token = ts[last - 1];
	              token.length += ts[last].length;
	              token.subType = Tokens.RANGE;
	
	              ts.length -= 1;
	            }
	
	            token.type = Tokens.NUMBER;
	          } else
	          if ((token.length == 1) &&
	              ((s[token.st] == ',') || (s[token.st] == '.')) && 
	              (ts.length > 1) && 
	              (ts[last - 1].type === Tokens.NUMBER)) {
	            append = true;
	
	            token = ts[last - 1];
	            token.length += ts[last].length;
	
	            ts.length -= 1;
	          }
	        } else
	        if (charType === Tokens.SPACE) {
	          if (token.type === Tokens.SPACE) {
	            append = true;
	          }
	        } else
	        if ((token.type === Tokens.MARKUP) && 
	            (s[token.st] == ch) &&
	            ('=-~:*#`\'>_'.indexOf(ch) > -1)) {
	          append = true;
	        } else
	        if (ch == '.') {
	          if (config.links && 
	              config.links.www && 
	              (token.length == 3) &&
	              (token.toLowerCase() == 'www')) { // Links without protocol but with www
	            append = true;
	            token.type = Tokens.LINK;
	          }
	        } else
	        if (config.wiki && (ch == "'") && (s[token.en()] == "'")) {
	          if (token.length > 1) {
	            token.length--;
	            st--;
	            tokenType = Tokens.MARKUP;
	          } else {
	            append = true;
	            token.type = Tokens.MARKUP;
	          }
	        } else
	        if ((ch == '-') || 
	            ((token.subType == Tokens.LATIN) && 
	             ((ch == '’') || (ch == "'")))) {
	          if (token.type === Tokens.WORD) {
	            append = true;
	          }
	        } else
	        if (ch == '/') {
	          if (config.links && 
	              config.links.protocols &&
	              (ts.length > 2) &&
	              (ts[last - 2].type === Tokens.WORD) &&
	              (ts[last - 2].subType == Tokens.LATIN) &&
	              (ts[last - 1].length == 1) &&
	              (s[ts[last - 1].st] == ':') &&
	              (ts[last].length == 1) &&
	              (s[ts[last].st] == '/')) { // Links (with protocols)
	            append = true;
	
	            token = ts[last - 2];
	            token.length += ts[last - 1].length + ts[last].length;
	            token.allUpper = token.allUpper && ts[last - 1].allUpper && ts[last].allUpper;
	            token.type = Tokens.LINK;
	
	            ts.length -= 2;
	          }
	        } else
	        if (config.html && ch == ';') {
	          if ((last > 0) && 
	              (token.type === Tokens.WORD) && 
	              (ts[last - 1].length == 1) &&
	              (s[ts[last - 1].st] == '&')) {
	            append = true;
	
	            token = ts[last - 1];
	            token.length += ts[last].length;
	            token.allUpper = token.allUpper && ts[last - 1].allUpper;
	            token.type = Tokens.ENTITY;
	
	            ts.length -= 1;
	          } else
	          if ((last > 1) && 
	              ((token.type === Tokens.WORD) || 
	               (token.type === Tokens.NUMBER)) && 
	              (ts[last - 1].length == 1) &&
	              (s[ts[last - 1].st] == '#') && 
	              (ts[last - 2].length == 1) &&
	              (s[ts[last - 2].st] == '&')) {
	            append = true;
	
	            token = ts[last - 2];
	            token.length += ts[last - 1].length + ts[last].length;
	            token.allUpper = token.allUpper && ts[last - 1].allUpper && ts[last].allUpper;
	            token.type = Tokens.ENTITY;
	
	            ts.length -= 2;
	          }
	        } else
	        if (config.markdown && 
	            (ch == '[') && 
	            (token.length == 1) &&
	            (s[token.st] == '!')) {
	          append = true;
	          token.type = Tokens.MARKUP;
	        } else
	        if (config.markdown && 
	            (ch == '(') &&
	            (token.length == 1) &&
	            (s[token.st] == ']')) {
	          tokenType = Tokens.MARKUP;
	          tokenSubType = Tokens.LINK;
	        } else
	        if (config.wiki && 
	            (ch == '{') &&
	            (token.length == 1) &&
	            (s[token.st] == '{')) {
	          append = true;
	          token.type = Tokens.MARKUP;
	          token.subType = Tokens.TEMPLATE;
	        } else
	        if (config.wiki && 
	            (ch == '[') && 
	            (token.length == 1) &&
	            (s[token.st] == '[')) {
	          append = true;
	        } else
	        if (config.wiki && 
	            (ch == ']') && 
	            (token.length == 1) &&
	            (s[token.st] == ']')) {
	          append = true;
	        } else
	        if (config.wiki && (ch == '|') && !lineStart) {
	          var found = -1;
	          for (var j = last - 1; j >= 0; j--) {
	            if ((ts[j].length == 2) && 
	                (s[ts[j].st] == '[') && 
	                (s[ts[j].st + 1] == '[')) {
	              found = j;
	              break;
	            }
	            if (((ts[j].length == 1) && 
	                 (s[ts[j].st] == '|')) || 
	                ts[j].indexOf('\n') > -1) {
	              break;
	            }
	          }
	          if (found > -1) {
	            append = true;
	            for (var j = last - 1; j >= found; j--) {
	              token = ts[j];
	              token.length += ts[j + 1].length;
	              token.allUpper = token.allUpper && ts[j + 1].allUpper;
	            }
	            last = found;
	            ts.length = last + 1;
	            token.subType = Tokens.LINK;
	          }
	        }
	      }
	
	      if (append) {
	        token.length++;
	        token.allUpper = token.allUpper && charUpper;
	      } else {
	        token = new Token(s, st, i + 1 - st, ts.length, charUpper, charUpper, tokenType, tokenSubType);
	        ts.push(token);
	      }
	    }
	    return this;
	  }
	
	  function alwaysTrue() {
	    return true;
	  }
	
	  function getMatcher(filter, exclude) {
	    if (!filter) {
	      return alwaysTrue();
	    }
	    if (typeof filter == 'function') {
	      return filter;
	    }
	    var types = filter;
	    var exclusive;
	    if ('length' in filter) {
	      exclusive = !exclude;
	      types = {};
	      for (var i = 0; i < filter.length; i++) {
	        types[filter[i]] = true;
	      }
	    } else {
	      exclusive = exclude;
	      exclude = false;
	    }
	    return function(token, index, array) {
	      if (token.subType) {
	        var sub = token.type + '.' + token.subType;
	        if (sub in types) {
	          return types[sub] != exclude;
	        }
	      }
	      if (token.type in types) {
	        return types[token.type] != exclude;
	      } else {
	        return !exclusive;
	      }
	    }
	  }
	
	  /**
	   * Завершает токенизацию, возвращая список токенов.
	   *
	   * Эта и другие функции принимают последними параметрами filter и флаг exclude. Они
	   * служат для фильтрации токенов (потому что часто удобнее получать не все токены, а
	   * только определенную часть из них).
	   *
	   * Если в filter передана функция, то параметр exclude игнорируется, а filter вызывается
	   * аналогично коллбэку в методе Array.prototype.filter: ей передаются параметры
	   * token, index, array (текущий токен, его индекс и общий список токенов). Будут
	   * возвращены только токены, для которых функция вернет истинное значение.
	   *
	   * Если в filter передан массив (или объект с полем length), то возвращаются токены, типы
	   * которых либо входят в этот массив (exclude=false), либо не входят в него (exclude=true).
	   * Вместо типов можно использовать строки вида 'WORD.LATIN' (тип, символ «точка» и подтип).
	   *
	   * Если в filter передать объект, то ключами в нём должны быть типы токенов, а значениями -
	   * true или false в зависимости от того, включать такие токены в ответ или нет. Как и в случае случае
	   * с массивом, в качестве ключей можно использовать строки вида 'WORD.LATIN'.
	   * Здесь параметр exclude означает, следует ли ограничить выдачу только теми типами, которые
	   * перечислены в filter.
	   * Значения с указанием подтипа имеют больший приоритет, чем просто типы. Благодаря этому можно
	   * делать такие странные вещи:
	   *
	   * ```
	   * t.done({ 'WORD': false, 'WORD.LATIN': true }, false);
	   * ```
	   * (то есть вернуть все теги, кроме тегов с типом WORD, но включить теги с подтипом LATIN)
	   *
	   * @param {Function|String[]|Object} [filter] Типы токенов, по которым нужно
	   *  отфильтровать результат (или функция для фильтрации).
	   * @param {boolean} [exclude=False] Инвертирует фильтр, т.е. возвращаются
	   *  токены со всеми типами, за исключением перечисленных в filter.
	   * @returns {Token[]} Список токенов после фильтрации.
	   */
	  Tokens.prototype.done = function(filter, exclude) {
	    // Finalize tokenizing, return list of tokens
	    // For now it just returns tokens, in the future there could be some additional work
	    if (!filter) {
	      return this.tokens;
	    }
	    var matcher = getMatcher(filter, exclude);
	    var list = [];
	    for (var i = 0; i < this.tokens.length; i++) {
	      if (matcher(this.tokens[i], i, this.tokens)) {
	        list.push(this.tokens[i]);
	      }
	    }
	    return list;
	  }
	
	  /**
	   * Подсчитывает текущее количество токенов.
	   *
	   * @param {Function|String[]|Object} [filter] См. описание метода done.
	   * @param {boolean} [exclude=False] См. описание метода done.
	   * @returns {Number} Число токенов после фильтрации.
	   */
	  Tokens.prototype.count = function(filter, exclude) {
	    if (!filter) {
	      return this.tokens.length;
	    }
	    var matcher = getMatcher(filter, exclude);
	    var count = 0;
	    for (var i = 0; i < this.tokens.length; i++) {
	      if (matcher(this.tokens[i], i, this.tokens)) {
	        count++;
	      }
	    }
	    return count;
	  }
	
	  /**
	   * Получает следующий токен относительно текущей позиции.
	   *
	   * @param {boolean} moveIndex Следует ли переместить указатель к
	   *  следующему токену (в противном случае следующий вызов nextToken вернет
	   *  тот же результат)
	   * @param {Function|String[]|Object} [filter] См. описание метода done.
	   * @param {boolean} [exclude=False] См. описание метода done.
	   * @returns {Token|null} Следующий токен или null, если подходящих токенов
	   *  впереди нет.
	   */
	  Tokens.prototype.nextToken = function(moveIndex, filter, exclude) {
	    var matcher = getMatcher(filter, exclude);
	    var index = this.index;
	    index++;
	    while (index < this.tokens.length && matcher(this.tokens[index], index, this.tokens)) {
	      index++;
	    }
	    if (index < this.tokens.length) {
	      if (moveIndex) {
	        this.index = index;
	      }
	      return this.tokens[index];
	    }
	    return null;
	  }
	
	  /**
	   * Проверяет, является ли следующий (за исключением пробелов) токен знаком
	   * препинания или нет.
	   *
	   * @returns {Token|False} False, если следующий токен не является знаком
	   *  препинания, либо сам токен в противном случае.
	   */
	  Tokens.prototype.punctAhead = function() {
	    var token = this.nextToken(false, ['SPACE'], true);
	    return token && token.type == 'PUNCT' && token;
	  }
	
	  /**
	   * Получает предыдущий токен относительно текущей позиции.
	   *
	   * @param {boolean} moveIndex Следует ли переместить указатель к
	   *  предыдущему токену (в противном случае следующий вызов prevToken вернет
	   *  тот же результат)
	   * @param {Function|String[]|Object} [filter] См. описание метода done.
	   * @param {boolean} [exclude=False] См. описание метода done.
	   * @returns {Token|null} Предыдущий токен или null, если подходящих токенов
	   *  позади нет.
	   */
	  Tokens.prototype.prevToken = function(moveIndex, filter, exclude) {
	    var matcher = getMatcher(filter, exclude);
	    var index = this.index;
	    index--;
	    while (index >= 0 && matcher(this.tokens[index], index, this.tokens)) {
	      index--;
	    }
	    if (index >= 0) {
	      if (moveIndex) {
	        this.index = index;
	      }
	      return this.tokens[index];
	    }
	    return null;
	  }
	
	  /**
	   * Проверяет, является ли предыдущий (за исключением пробелов) токен знаком
	   * препинания или нет.
	   *
	   * @returns {Token|False} False, если предыдущий токен не является знаком
	   *  препинания, либо сам токен в противном случае.
	   */
	  Tokens.prototype.punctBehind = function() {
	    var token = this.prevToken(false, ['SPACE'], true);
	    return token && token.type == 'PUNCT' && token;
	  }
	
	  /**
	   * Проверяет, есть ли впереди текущей позиции токены, удовлетворяющие фильтру.
	   *
	   * @param {Function|String[]|Object} [filter] См. описание метода done.
	   * @param {boolean} [exclude=False] См. описание метода done.
	   * @returns {boolean} True если впереди есть хотя бы один подходящий токен,
	   *  и False в противном случае.
	   */
	  Tokens.prototype.hasTokensAhead = function(filter, exclude) {
	    return this.nextToken(false, filter, exclude) != null;
	  }
	
	  /**
	   * Проверяет, есть ли позади текущей позиции токены, удовлетворяющие фильтру.
	   *
	   * @param {Function|String[]|Object} [filter] См. описание метода done.
	   * @param {boolean} [exclude=False] См. описание метода done.
	   * @returns {boolean} True если позади есть хотя бы один подходящий токен,
	   *  и False в противном случае.
	   */
	  Tokens.prototype.hasTokensBehind = function(filter, exclude) {
	    return this.prevToken(false, filter, exclude) != null;
	  }
	
	  return Tokens;
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 39 */
/***/ (function(module, exports) {



/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Created by Shayakhmetov on 23.08.2016.
	 */
	
	'use strict';
	
	var symbols = __webpack_require__(41);
	var operators = __webpack_require__(42);
	var fractions = __webpack_require__(43);
	var sets = __webpack_require__(44);
	var logic = __webpack_require__(45);
	var calculus = __webpack_require__(46);
	var chemistry = __webpack_require__(53);
	
	module.exports = function(exp, options){
	    var text, masks;
	    switch(options.type){
	        case 'algebra':
	            masks = [].concat(fractions, symbols, operators);
	            break;
	        case 'set':
	            masks = [].concat(fractions, sets);
	            break;
	        case 'logic':
	            masks = [].concat(fractions, logic, sets, operators);
	            break;
	      case 'chem':
	            masks = [].concat(chemistry);
	            break;
	    }
	    masks.sort(compare);
	    //console.log(masks);
	    text = process(exp, masks, options.lang, options.output);
	    return text;
	};
	
	
	
	function process(exp, masks, lang, output){
	    var resultStr = exp;
	        masks.forEach(function(sign){
	            var lang = (lang in sign)? lang : 'en';
	            if( output === 'text' ){
	                resultStr = resultStr.replace(sign.mask, sign[lang]);
	            }
	            else{
	                if(sign.oedx){
	                    resultStr = resultStr.replace(sign.mask, sign[lang]);
	                }
	            }
	        });
	    return resultStr;
	}
	
	function compare(a,b){
	    if(!('priority' in a))
	        a.priority = 0;
	    if(!('priority' in b))
	        b.priority = 0;
	    if(a.priority < b.priority)
	        return 1;
	    if(a.priority > b.priority)
	        return -1;
	    return 0;
	}
	/*
	function numbersProcessing(text){
	    return text;
	}*/
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 41 */
/***/ (function(module, exports) {

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


/***/ }),
/* 42 */
/***/ (function(module, exports) {

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


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 02.11.2016.
	 */
	'use strict';
	
	var SIGNS = [
	    {mask: /\\frac\{1\}\{2\}/g, en: ' the one half ', exp: 'frac{1}{2}', priority: 2}
	
	];
	
	
	module.exports = SIGNS;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

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


/***/ }),
/* 45 */
/***/ (function(module, exports) {

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

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	
	var derivatives = __webpack_require__(47);
	var functions = __webpack_require__(48);
	var integral = __webpack_require__(49);
	var limit = __webpack_require__(50);
	var series = __webpack_require__(51);
	var term = __webpack_require__(52);
	
	
	module.exports = [].concat(derivatives, functions, integral, limit, series, term);

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /d 2 [^\s]+ by d [^\s]+ squared/g, latex: function(text){
	        var params = text.replace('by d ', '').replace(' squared', '').replace(/^d 2 /, '').split(' ');
	        return '\\frac{d^2 ' + params[0] + '}{d ' + params[1] + '^2}';
	    }, exp: function(text){
	        var params = text.replace('by d ', '').replace(/^d /, '');
	        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }, priority: 1},
	    {mask: /\d+?-th derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
	        var params = text.replace('-th derivative of ', ' ').replace('with respect to ', '').split(' ');
	        return '\\frac{d^' + params[0] + ' ' + params[1] + '}{d ' + params[2] + '^' + params[0] + '}';
	    }, exp: function(text){
	        var params = text.replace('-th derivative of ', '').replace('with respect to ', '').split(' ');
	        return '\\frac{d^' + params[0] + ' ' + params[1] + '}{d ' + params[2] + '^' + params[0] + '}';
	    }, priority: 1},
	
	    {mask: /partial d [^\s]+ by d [^\s]+/g, latex: function(text){
	        var params = text.replace('by d ', '').replace('partial d ', '').split(' ');
	        return '\\frac{\\partial ' + params[0] + '}{\\partial ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('by d ', '').replace('partial d ', '').split(' ');
	        return 'frac{del ' + params[0] + '}{del ' + params[1] + '}';
	    }, priority: 1},
	    {mask: /\d+?-th partial derivative of [^\s]+ with respect to [^\s]+ and [^\s]+/g, latex: function(text){
	        var params = text.replace('-th partial derivative of ', ' ').replace('with respect to ', '').replace('and ', '').split(' ');
	        return '\\frac{\\partial ^' + params[0] + ' ' + params[1] + '}{\\partial ' + params[2] + '\\partial ' + params[3] + '}';
	    }, exp: function(text){
	        var params = text.replace('-th partial derivative of ', ' ').replace('with respect to ', '').replace('and ', '').split(' ');
	        return 'frac{del ^' + params[0] + ' ' + params[1] + '}{del ' + params[2] + 'del ' + params[3] + '}';
	    }},
	    {mask: /partial derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
	        var params = text.replace('partial derivative of ', '').replace('with respect to ', '').split(' ');
	        return '\\frac{\\partial ' + params[0] + '}{\\partial ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('partial derivative of ', '').replace('with respect to ', '').split(' ');
	        return 'frac{del ' + params[0] + '}{del ' + params[1] + '}';
	    }},
	
	    {mask: /d [^\s]+ by d [^\s]+/g, latex: function(text){
	        var params = text.replace('by d ', '').replace(/^d /, '').split(' ');
	        return '\\frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('by d ', '').replace(/^d /, '').split(' ');
	        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }},
	    {mask: /derivative of [^\s]+ with respect to [^\s]+/g, latex: function(text){
	        var params = text.replace('derivative of ', '').replace('with respect to ', '').split(' ');
	        return '\\frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }, exp: function(text){
	        var params = text.replace('derivative of ', '').replace('with respect to ', '').split(' ');
	        return 'frac{d ' + params[0] + '}{d ' + params[1] + '}';
	    }},
	
	    {mask: /differential of/g, latex: 'd'},
	    {mask: /double prime/g, latex: '\\prime\\prime', exp: "''"},
	    {mask: /second derivative of [^\s]+/g, latex: function(text){
	        return text.replace('second derivative of ', '') + '\\prime\\prime';
	    }, exp: function(text){
	        return text.replace('second derivative of ', '') + "''";
	    }},
	    {mask: /triple prime/g, latex: '\\prime\\prime\\prime', exp: "'''"},
	    {mask: /third derivative of [^\s]+/g, latex: function(text){
	        return text.replace('third derivative of ', '') + '\\prime\\prime\\prime';
	    }, exp: function(text){
	        return text.replace('third derivative of ', '') + "'''";
	    }},
	    {mask: /prime/g, latex: '\\prime', exp: "'"},
	    {mask: /derivative of .+? of the order [^\s]+/g, latex: function(text){
	        return text.replace('derivative of ', '').replace(' of the order ', '^');
	    }},
	    {mask: /derivative of [^\s]+/g, latex: function(text){
	        return text.replace('derivative of ', '') + '\\prime';
	    }, exp: function(text){
	        return text.replace('derivative of ', '') + "'";
	    }},
	    {mask: /[^\s]+-th derivative of [^\s]+/g, latex: function(text){
	        var order = text.substring(0, text.indexOf('-th derivative of'));
	        var func = text.substring(text.lastIndexOf('-th derivative of')).replace('-th derivative of', '');
	        return func + '^{(' + order + ')}';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: / of [^\s]+/g, latex: function(text){
	        return text.replace(' of ', '(') + ')';
	    }, priority: '-1'},
	    {mask: / is a function of [^\s]+/g, latex: function(text){
	        return text.replace(' is a function of ', '(') + ')';
	    }, priority: '-1'},
	    {mask: /domain of the function /g, latex: 'D_'},
	    {mask: /range of the function /g, latex: 'R_'},
	    {mask: /composition of the functions [^\s]+ and [^\s]+/g, latex: function(text){
	        return text.replace('composition of the functions ', '').replace(' and ', '\\circ');
	    }, exp: function(text){
	        return text.replace('composition of the functions ', '').replace(' and ', '@');
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /double integral (from .+? to [^\s]+)?/g, latex: function(text){
	        return text.replace('double integral ', '\\iint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }, exp: function(text){
	        return text.replace('double integral ', 'intint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /triple integral (from .+? to [^\s]+)?/g, latex: function(text){
	        return text.replace('triple integral ', '\\iiint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }, exp: function(text){
	        return text.replace('triple integral ', 'intintint').replace('from ', '_{').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /integral (from .+? to [^\s]+)?/g, latex: function(text){
	        var close = (text.indexOf('from') > -1)? '}' : '';
	        return text.replace('integral ', '\\int').replace('from ', '_{').replace(' to ', '}^{') + close;
	    }, exp: function(text){
	        var close = (text.indexOf('from') > -1)? '}' : '';
	        return text.replace('integral ', 'int').replace('from ', '_{').replace(' to ', '}^{') + close;
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	/*var tmplStr = require('../../tmplStr');*/
	
	var RULES = [
	    {mask: /limit of [^\s]+ [^\s]+ as [^\s]+ tends to [^\s]+/g, latex: function(text){
	        var params = text.replace('limit of ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return /*tmplStr(params, '\\lim_{${2}\\to${3}}${0}_${1}');*/'\\lim_{' + params[2] + '\\to' + params[3] + '}' + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('limit of ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return 'lim_{' + params[2] + 'to' + params[3] + '}' + params[0] + '_' + params[1];
	    }},
	    {mask: /[^\s]+ [^\s]+ converges to [^\s]+ as [^\s]+ tends to [^\s]+/g, latex: function(text){
	        var params = text.replace('converges to ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return '\\lim_{' + params[3] + ' \\to ' + params[4] + '}' + params[0] + '_' + params[1] + '=' + params[2];
	    }, exp: function(text){
	        var params = text.replace('converges to ', '').replace('as ', '').replace('tends to ', '').split(' ');
	        return 'lim_{' + params[3] + ' to ' + params[4] + '}' + params[0] + '_' + params[1] + '=' + params[2];
	    }},
	    {mask: /[^\s]+ from the (left|right)/g, latex: function(text){
	        return '{' + text.replace('from the ', '').replace(' left', '-0').replace(' right', '+0') + '}';
	    }},
	    {mask: /limit of [^\s]+ of [^\s]+ as [^\s]+ approaches [^\s]+/g, latex: function(text){
	        var params = text.replace('limit of ', '').replace('of ', '').replace('as ', '').replace('approaches ', '').replace('from the ', '').split(' ');
	        return '\\lim_{' + params[2] + ' \\to ' + params[3] + '}' + params[0] + '(' + params[1] + ')';
	    }, exp: function(text){
	        var params = text.replace('limit of ', '').replace('of ', '').replace('as ', '').replace('approaches ', '').replace('from the ', '').split(' ');
	        return 'lim_{' + params[2] + ' to ' + params[3] + '}' + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: / and /g, latex: '\\wedge', exp: '^^'},
	    {mask: / not /g, latex: '\\bar', exp: 'bar'},
	    {mask: / implies /g, latex: '\\Rightarrow', exp: 'rArr'},
	    {mask: / is equivalent to /g, latex: '\\sim', exp: '~'},
	    {mask: /for any/g, latex: '\\forall', exp: 'AA'},
	    {mask: /for all/g, latex: '\\forall', exp: 'AA'},
	    {mask: /there exists/g, latex: '\\exists', exp: 'EE'},
	    {mask: /such that/g, latex: ':'},
	    {mask: /real [^\s]+/g, latex: function(text){
	        return text.replace('real ', '') + '\\in\\mathbb{R}';
	    }, exp: function(text){
	        return text.replace('real ', '') + 'in RR';
	    }},
	    {mask: /integer [^\s]+/g, latex: function(text){
	        return text.replace('integer ', '') + '\\in\\mathbb{N}';
	    }, exp: function(text){
	        return text.replace('integer ', '') + 'in NN';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /sequence [^\s]+ [^\s]+ as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
	        var params = text.replace('sequence ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return '\\{' + params[0] + '_' + params[1] + '\\}_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}';
	    }, exp: function(text){
	        var params = text.replace('sequence ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return '{' + params[0] + '_' + params[1] + '}_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}';
	    }},
	    {mask: /sequence [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('sequence ', '').split(' ');
	        return '\\{' + params[0] + '_' + params[1] + '\\}';
	    }},
	    {mask: /sum of [^\s]+ [^\s]+ as [^\s]+ goes from [^\s]+ to [^\s]+/g, latex: function(text){
	        var params = text.replace('sum of ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return '\\sum_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}' + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('sum of ', '').replace('as ', '').replace('goes from ', '').replace('to ', '').split(' ');
	        return 'sum_{' + params[2] + '=' + params[3] + '}^{' + params[4] + '}' + params[0] + '_' + params[1];
	    }},
	    {mask: /series [^\s]+ [^\s]+/g, latex: function(text){
	        var params = text.replace('series ', '').split(' ');
	        return '\\sum' + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('series ', '').split(' ');
	        return 'sum' + params[0] + '_' + params[1];
	    }, priority: -1},
	    {mask: /sequence [^\s]+ [^\s]+ converges to/g, latex: function(text){
	        var params = text.replace('sequence ', '').replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to';
	    }, exp: function(text){
	        var params = text.replace('sequence ', '').replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + 'to';
	    }},
	    {mask: /[^\s]+ [^\s]+ converges to/g, latex: function(text){
	        var params = text.replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to';
	    }, exp: function(text){
	        var params = text.replace(' converges to', '').split(' ');
	        return params[0] + '_' + params[1] + 'to';
	    }},
	    {mask: /[^\s]+ [^\s]+ diverges to infinity/g, latex: function(text){
	        var params = text.replace(' diverges to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' diverges to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }},
	    {mask: /series [^\s]+ [^\s]+ diverges/g, latex: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }},
	    {mask: /[^\s]+ [^\s]+ diverges/g, latex: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return '\\sum' + params[0] + '_' + params[1] + '=\\infty';
	    }, exp: function(text){
	        var params = text.replace(' diverges', '').split(' ');
	        return 'sum' + params[0] + '_' + params[1] + '= infty';
	    }},
	    {mask: /[^\s]+ [^\s]+ goes to infinity/g, latex: function(text){
	        var params = text.replace(' goes to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' goes to infinity', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }},
	    {mask: /[^\s]+ [^\s]+ approaches infinity/g, latex: function(text){
	        var params = text.replace(' approaches infinity', '').split(' ');
	        return params[0] + '_' + params[1] + '\\to\\infty';
	    }, exp: function(text){
	        var params = text.replace(' approaches infinity', '').split(' ');
	        return params[0] + '_' + params[1] + 'to infty';
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	'use strict';
	
	var RULES = [
	    {mask: /\\Delta/g, en: 'the Laplacian of', exp: 'Delta'},
	    {mask: /\\nabla/g, en: 'gradient of', exp: 'grad'},
	    {mask: /\\mathbf\{grad\}/g, en: 'gradient', exp: 'bb{g\\rad}'},
	    {mask: /\\mathbf\{div\}/g, en: 'divergence', exp: 'bb{d\iv}'},
	    {mask: /\\mathbf\{rot\}/g, en: 'rotor', exp: 'bb{rot}'},
	    {mask: /Im/g, en: 'imaginary part of'},
	    {mask: /Re/g, en: 'real part of'},
	    {mask: /_\{[^\s]+?=\}/g, en: function(text){
	        return text.replace('as ', '_{').replace(' goes from ', '=').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /as [^\s]+ runs over [^\s]+ to [^\s]+/g, en: function(text){
	        return text.replace('as ', '_{').replace(' runs over ', '\\in').replace(' to ', '}^{') + '}';
	    }, exp: function(text){
	        return text.replace('as ', '_{').replace(' runs over ', 'in').replace(' to ', '}^{') + '}';
	    }},
	    {mask: /as [^\s]+ is positive/g, en: function(text){
	        return text.replace('as ', '_{').replace(' is positive', '\\gt0}');
	    }, exp: function(text){
	        return text.replace('as ', '_{').replace(' is positive', '>0}');
	    }},
	    {mask: /as [^\s]+ is negative/g, en: function(text){
	        return text.replace('as ', '_{').replace(' is negative', '\\lt0}');
	    }, exp: function(text){
	        return text.replace('as ', '_{').replace(' is negative', '<0}');
	    }},
	    {mask: /residue of [^\s]+ of [^\s]+ at [^\s]+ equals [^\s]+/g, en: function(text){
	        var params = text.replace('residue of ', '').replace('of ', '').replace('at ', '').replace('equals ', '').split(' ');
	        return 'res ' + '_{' + params[2] + '=' + params[3] + '}' + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: /minimum of [^\s]+ of [^\s]+ [^\s]+/g, en: function(text){
	        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
	        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
	    }, exp: function(text){
	        var params = text.replace('minimum of ', '').replace('of ', '').split(' ');
	        return 'min ' + params[2] + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: /maximum of [^\s]+ of [^\s]+ [^\s]+/g, en: function(text){
	        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
	        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
	    }, exp: function(text){
	        var params = text.replace('maximum of ', '').replace('of ', '').split(' ');
	        return 'max ' + params[2] + params[0] + '(' + params[1] + ')';
	    }},
	    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, en: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return '\\sum' + params[2] + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return 'sum' + params[2] + params[0] + '_' + params[1];
	    }},
	    {mask: /sum of [^\s]+ [^\s]+ [^\s]+/g, en: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return '\\sum' + params[2] + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('sum of ', '').split(' ');
	        return 'sum' + params[2] + params[0] + '_' + params[1];
	    }},
	    {mask: /product of [^\s]+ [^\s]+ [^\s]+/g, en: function(text){
	        var params = text.replace('product of ', '').split(' ');
	        return '\\sum' + params[2] + params[0] + '_' + params[1];
	    }, exp: function(text){
	        var params = text.replace('product of ', '').split(' ');
	        return 'sum' + params[2] + params[0] + '_' + params[1];
	    }}
	];
	
	module.exports = RULES;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by Shayakhmetov on 22.09.2016.
	 */
	
	var elements = __webpack_require__(54);
	var formula = __webpack_require__(55);
	var post = __webpack_require__(56);
	
	
	module.exports = [].concat(elements, formula, post);

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	'use strict';
	
	var SIGNS = [
	  {mask: /Na/g, en: 'sodium'},
	  {mask: /O/g, en: 'oxygen'},
	  {mask: /Ca/g, en: 'xalcium'},
	  {mask: /Cr/g, en: 'chromium'},
	
	
	  {mask: /Ar/g, en: 'argon', exp: 'Ar'},
	  {mask: /Am/g, en: 'americium', exp: 'Am'},
	  {mask: /Ar/g, en: 'arsenic', exp: 'Ar'},
	  {mask: /At/g, en: 'astatine', exp: 'At'},
	  {mask: /Au/g, en: 'gold', exp: 'Au'},
	  {mask: /B/g, en: 'boron', exp: 'B'},
	  {mask: /Ba/g, en: 'barium', exp: 'Ba'},
	  {mask: /Bh/g, en: 'bohrium', exp: 'Bh'},
	  {mask: /Bi/g, en: 'bismuth', exp: 'Bi'},
	  {mask: /Br/g, en: 'bromine', exp: 'Br'},
	  {mask: /Cd/g, en: 'cadmium', exp: 'Cd'},
	  {mask: /Ce/g, en: 'cerium', exp: 'Ce'},
	  {mask: /Co/g, en: 'cobalt', exp: 'Co'},
	  {mask: /Cl/g, en: 'chlorine', exp: 'Cl'},
	  {mask: /Cs/g, en: 'cesium', exp: 'Cs'},
	  {mask: /Cu/g, en: 'copper', exp: 'Cu'},
	  {mask: /Db/g, en: 'dubnium', exp: 'Db'},
	  {mask: /Ds/g, en: 'darmstadtium', exp: 'Ds'},
	  {mask: /Dy/g, en: 'dysprosium', exp: 'Dy'},
	  {mask: /Er/g, en: 'erbium', exp: 'Er'},
	  {mask: /einsteinium/g, en: 'Es', exp: 'Es'},
	  {mask: /europium/g, en: 'Eu', exp: 'Eu'},
	  {mask: /fluorine/g, en: 'F', exp: 'F'},
	  {mask: /fermium/g, en: 'Fm', exp: 'Fm'},
	  {mask: /francium/g, en: 'Fr', exp: 'Fr'},
	  {mask: /gallium/g, en: 'Ga', exp: 'Ga'},
	  {mask: /gadolinium/g, en: 'Gd', exp: 'Gd'},
	  {mask: /germanium/g, en: 'Ge', exp: 'Ge'},
	  {mask: /hafnium/g, en: 'Hf', exp: 'Hf'},
	  {mask: /mercury/g, en: 'Hg', exp: 'Hg'},
	  {mask: /holmium/g, en: 'Ho', exp: 'Ho'},
	  {mask: /hassium/g, en: 'Hs', exp: 'Hs'},
	  {mask: /iodine/g, en: 'I', exp: 'I'},
	  {mask: /indium/g, en: 'In', exp: 'In'},
	  {mask: /iridium/g, en: 'Ir', exp: 'Ir'},
	  {mask: /potassium/g, en: 'K', exp: 'K'},
	  {mask: /krypton/g, en: 'Kr', exp: 'Kr'},
	  {mask: /lanthanum/g, en: 'La', exp: 'La'},
	  {mask: /lithium/g, en: 'Li', exp: 'Li'},
	  {mask: /lutetium/g, en: 'Lu', exp: 'Lu'},
	  {mask: /mendelevium/g, en: 'Md', exp: 'Md'},
	  {mask: /manganese/g, en: 'Mn', exp: 'Mn'},
	  {mask: /molybdenum/g, en: 'Mo', exp: 'Mo'},
	  {mask: /meitnerium/g, en: 'Mt', exp: 'Mt'},
	  {mask: /nitrogen/g, en: 'N', exp: 'N'},
	  {mask: /niobium/g, en: 'Nb', exp: 'Nb'},
	  {mask: /neodymium/g, en: 'Nd', exp: 'Nd'},
	  {mask: /neon/g, en: 'Ne', exp: 'Ne'},
	  {mask: /nickel/g, en: 'Ni', exp: 'Ni'},
	  {mask: /nobelium/g, en: 'No', exp: 'No'},
	  {mask: /neptunium/g, en: 'Np', exp: 'Np'},
	  {mask: /osmium/g, en: 'Os', exp: 'Os'},
	  {mask: /phosphorus/g, en: 'P', exp: 'P'},
	  {mask: /protactinium/g, en: 'Pa', exp: 'Pa'},
	  {mask: /lead/g, en: 'Pb', exp: 'Pb'},
	  {mask: /palladium/g, en: 'Pd', exp: 'Pd'},
	  {mask: /promethium/g, en: 'Pm', exp: 'Pm'},
	  {mask: /polonium/g, en: 'Po', exp: 'Po'},
	  {mask: /praseodymium/g, en: 'Pr', exp: 'Pr'},
	  {mask: /platinum/g, en: 'Pt', exp: 'Pt'},
	  {mask: /plutonium/g, en: 'Pu', exp: 'Pu'},
	  {mask: /radium/g, en: 'Ra', exp: 'Ra'},
	  {mask: /rutherfordium/g, en: 'Rf', exp: 'Rf'},
	  {mask: /ruthenium/g, en: 'Ru', exp: 'Ru'},
	  {mask: /sulfur/g, en: 'S', exp: 'S'},
	  {mask: /uranium/g, en: 'U', exp: 'U'},
	  {mask: /zinc/g, en: 'Zn', exp: 'Zn'},
	  {mask: /zirconium/g, en: 'Zr', exp: 'Zr'}
	
	  ];
	
	
	
	
	module.exports = SIGNS;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	
	'use strict';
	
	var SIGNS = [
	  {mask: /sub/g,  en: ' '},
	  {mask: /_/g, en: ' '}
	
	];
	
	module.exports = SIGNS;

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	
	'use strict';
	
	var SIGNS = [
	  {mask: /undefined/g, en: ' '}
	
	];
	
	module.exports = SIGNS;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var ml = __webpack_require__(58);
	
	var tokenTypes = __webpack_require__(60);
	var CONST = tokenTypes.CONST;
	var UNARY = tokenTypes.UNARY;
	var BINARY = tokenTypes.BINARY;
	var INFIX = tokenTypes.INFIX;
	var LEFTBRACKET = tokenTypes.LEFTBRACKET;
	var RIGHTBRACKET = tokenTypes.RIGHTBRACKET;
	var SPACE = tokenTypes.SPACE;
	var UNDEROVER = tokenTypes.UNDEROVER;
	var DEFINITION = tokenTypes.DEFINITION;
	var LEFTRIGHT = tokenTypes.LEFTRIGHT;
	var TEXT = tokenTypes.TEXT;
	
	var AMsymbols = __webpack_require__(61);
	var AMnames = AMsymbols.map(function (symbol) {
	  return symbol.input;
	}); //list of input symbols
	
	module.exports = parseMath;
	function parseMath(str) {
	  var frag, node;
	  AMnestingDepth = 0;
	  frag = AMparseExpr(str.replace(/^\s+/g, ""), false)[0];
	  node = createMmlNode("math", frag);
	  node.setAttribute("title", str.replace(/\s+/g, " "));
	  return node;
	}
	
	var useFakes = true;
	
	function createMmlNode(t, frag) {
	  var node = useFakes ? new ml.Node(t) : document.createElementNS("http://www.w3.org/1998/Math/MathML", t);
	  if (typeof frag === 'string') frag = useFakes ? new ml.Text(frag) : document.createTextNode(frag);
	  if (frag) node.appendChild(frag);
	  return node;
	}
	
	function createFragment() {
	  return useFakes ? new ml.Node('fragment') : document.createDocumentFragment();
	}
	
	var AMquote = {
	  input: "\"",
	  tag: "mtext",
	  output: "mbox",
	  tex: null,
	  ttype: TEXT
	};
	
	
	
	function AMremoveCharsAndBlanks(str, n) {
	  //remove n characters and any following blanks
	  var st;
	  if (str.charAt(n) == "\\" && str.charAt(n + 1) != "\\" && str.charAt(n + 1) != " ") st = str.slice(n + 1);
	  else st = str.slice(n);
	  for (var i = 0; i < st.length && st.charCodeAt(i) <= 32; i = i + 1);
	  return st.slice(i);
	}
	
	function position(arr, str, n) {
	  // return position >=n where str appears or would be inserted
	  // assumes arr is sorted
	  if (n == 0) {
	    var h, m;
	    n = -1;
	    h = arr.length;
	    while (n + 1 < h) {
	      m = (n + h) >> 1;
	      if (arr[m] < str) n = m;
	      else h = m;
	    }
	    return h;
	  } else {
	    for (var i = n; i < arr.length && arr[i] < str; i++);
	    return i; // i=arr.length || arr[i]>=str
	  }
	}
	
	function AMgetSymbol(str) {
	  //return maximal initial substring of str that appears in names
	  //return null if there is none
	  var k = 0; //new pos
	  var j = 0; //old pos
	  var mk; //match pos
	  var st;
	  var tagst;
	  var match = "";
	  var more = true;
	  for (var i = 1; i <= str.length && more; i++) {
	    st = str.slice(0, i); //initial substring of length i
	    j = k;
	    k = position(AMnames, st, j);
	    if (k < AMnames.length && str.slice(0, AMnames[k].length) == AMnames[k]) {
	      match = AMnames[k];
	      mk = k;
	      i = match.length;
	    }
	    more = k < AMnames.length && str.slice(0, AMnames[k].length) >= AMnames[k];
	  }
	  AMpreviousSymbol = AMcurrentSymbol;
	  if (match != "") {
	    AMcurrentSymbol = AMsymbols[mk].ttype;
	    return AMsymbols[mk];
	  }
	  // if str[0] is a digit or - return maxsubstring of digits.digits
	  AMcurrentSymbol = CONST;
	  k = 1;
	  st = str.slice(0, 1);
	  var integ = true;
	  while ("0" <= st && st <= "9" && k <= str.length) {
	    st = str.slice(k, k + 1);
	    k++;
	  }
	  if (st == '.') {
	    st = str.slice(k, k + 1);
	    if ("0" <= st && st <= "9") {
	      integ = false;
	      k++;
	      while ("0" <= st && st <= "9" && k <= str.length) {
	        st = str.slice(k, k + 1);
	        k++;
	      }
	    }
	  }
	  if ((integ && k > 1) || k > 2) {
	    st = str.slice(0, k - 1);
	    tagst = "mn";
	  } else {
	    k = 2;
	    st = str.slice(0, 1); //take 1 character
	    tagst = (("A" > st || st > "Z") && ("a" > st || st > "z") ? "mo" : "mi");
	  }
	  if (st == "-" && AMpreviousSymbol == INFIX) {
	    AMcurrentSymbol = INFIX; //trick "/" into recognizing "-" on second parse
	    return {
	      input: st,
	      tag: tagst,
	      output: st,
	      ttype: UNARY,
	      func: true
	    };
	  }
	  return {
	    input: st,
	    tag: tagst,
	    output: st,
	    ttype: CONST
	  };
	}
	
	function AMremoveBrackets(node) {
	  if (node.nodeName == "mrow") {
	    var start = node.firstChild.firstChild.nodeValue;
	    if (start == "(" || start == "[" || start == "{") node.removeChild(node.firstChild);
	    var end = node.lastChild.firstChild.nodeValue;
	    if (end == ")" || end == "]" || end == "}") node.removeChild(node.lastChild);
	  }
	}
	
	/*Parsing ASCII math expressions with the following grammar
	v ::= [A-Za-z] | greek letters | numbers | other constant symbols
	u ::= sqrt | text | bb | other unary symbols for font commands
	b ::= frac | root | stackrel         binary symbols
	l ::= ( | [ | { | (: | {:            left brackets
	r ::= ) | ] | } | :) | :}            right brackets
	S ::= v | lEr | uS | bSS             Simple expression
	I ::= S_S | S^S | S_S^S | S          Intermediate expression
	E ::= IE | I/I                       Expression
	Each terminal symbol is translated into a corresponding mathml node.*/
	
	var AMnestingDepth, AMpreviousSymbol, AMcurrentSymbol;
	
	function AMparseSexpr(str) { //parses str and returns [node,tailstr]
	  var symbol, node, result, i, st; // rightvert = false,
	  str = AMremoveCharsAndBlanks(str, 0);
	  symbol = AMgetSymbol(str); //either a token or a bracket or empty
	  if (symbol == null || symbol.ttype == RIGHTBRACKET && AMnestingDepth > 0) {
	    return [null, str];
	  }
	  if (symbol.ttype == DEFINITION) {
	    str = symbol.output + AMremoveCharsAndBlanks(str, symbol.input.length);
	    symbol = AMgetSymbol(str);
	  }
	  switch (symbol.ttype) {
	    case UNDEROVER:
	    case CONST:
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      //its a constant
	      return [createMmlNode(symbol.tag, symbol.output), str];
	    case LEFTBRACKET:
	      //read (expr+)
	      AMnestingDepth++;
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      result = AMparseExpr(str, true);
	      AMnestingDepth--;
	      if (typeof symbol.invisible == "boolean" && symbol.invisible) node = createMmlNode("mrow", result[0]);
	      else {
	        node = createMmlNode("mo", symbol.output);
	        node = createMmlNode("mrow", node);
	        node.appendChild(result[0]);
	      }
	      return [node, result[1]];
	    case TEXT:
	      var mRow = createMmlNode("mrow");
	      if (symbol != AMquote) str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      if (str.charAt(0) == "{") i = str.indexOf("}");
	      else if (str.charAt(0) == "(") i = str.indexOf(")");
	      else if (str.charAt(0) == "[") i = str.indexOf("]");
	      else if (symbol == AMquote) i = str.slice(1).indexOf("\"") + 1;
	      else i = 0;
	      if (i == -1) i = str.length;
	      st = str.slice(1, i);
	      if (st.charAt(0) == " ") {
	        node = createMmlNode("mspace");
	        node.setAttribute("width", "1ex");
	        mRow.appendChild(node);
	      }
	      mRow.appendChild(
	      createMmlNode(symbol.tag, st));
	      if (st.charAt(st.length - 1) == " ") {
	        node = createMmlNode("mspace");
	        node.setAttribute("width", "1ex");
	        mRow.appendChild(node);
	      }
	      str = AMremoveCharsAndBlanks(str, i + 1);
	      return [mRow, str];
	    case UNARY:
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      result = AMparseSexpr(str);
	      if (result[0] == null) return [createMmlNode(symbol.tag, symbol.output), str];
	      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
	        st = str.charAt(0);
	        if (st == "^" || st == "_" || st == "/" || st == "|" || st == ",") {
	          return [createMmlNode(symbol.tag, symbol.output), str];
	        } else {
	          node = createMmlNode("mrow", createMmlNode(symbol.tag, symbol.output));
	          node.appendChild(result[0]);
	          return [node, result[1]];
	        }
	      }
	      AMremoveBrackets(result[0]);
	      if (symbol.input == "sqrt") { // sqrt
	        return [createMmlNode(symbol.tag, result[0]), result[1]];
	      } else if (typeof symbol.acc == "boolean" && symbol.acc) { // accent
	        node = createMmlNode(symbol.tag, result[0]);
	        node.appendChild(createMmlNode("mo", symbol.output));
	        return [node, result[1]];
	      } else { // font change command
	        if (typeof symbol.codes != "undefined") {
	          for (i = 0; i < result[0].childNodes.length; i++)
	          if (result[0].childNodes[i].nodeName == "mi" || result[0].nodeName == "mi") {
	            st = (result[0].nodeName == "mi" ? result[0].firstChild.nodeValue : result[0].childNodes[i].firstChild.nodeValue);
	            var newst = [];
	            for (var j = 0; j < st.length; j++)
	            if (st.charCodeAt(j) > 64 && st.charCodeAt(j) < 91) newst = newst + String.fromCharCode(symbol.codes[st.charCodeAt(j) - 65]);
	            else newst = newst + st.charAt(j);
	            if (result[0].nodeName == "mi") result[0] = createMmlNode("mo", newst);
	            else result[0].replaceChild(createMmlNode("mo", newst), result[0].childNodes[i]);
	          }
	        }
	        node = createMmlNode(symbol.tag, result[0]);
	        node.setAttribute(symbol.atname, symbol.atval);
	        return [node, result[1]];
	      }
	    case BINARY:
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      result = AMparseSexpr(str);
	      if (result[0] == null) return [createMmlNode("mo", symbol.input), str];
	      AMremoveBrackets(result[0]);
	      var result2 = AMparseSexpr(result[1]);
	      if (result2[0] == null) return [createMmlNode("mo", symbol.input), str];
	      AMremoveBrackets(result2[0]);
	
	      var binaryTag = createMmlNode(symbol.tag);
	      if (symbol.input == "root" || symbol.input == "stackrel") binaryTag.appendChild(result2[0]);
	      binaryTag.appendChild(result[0]);
	      if (symbol.input == "frac") binaryTag.appendChild(result2[0]);
	      return [binaryTag, result2[1]];
	    case INFIX:
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      return [createMmlNode("mo", symbol.output), str];
	    case SPACE:
	      var mRow = createMmlNode("mrow");
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      node = createMmlNode("mspace");
	      node.setAttribute("width", "1ex");
	      mRow.appendChild(node);
	      mRow.appendChild(createMmlNode(symbol.tag, symbol.output));
	      node = createMmlNode("mspace");
	      node.setAttribute("width", "1ex");
	      mRow.appendChild(node);
	      return [mRow, str];
	    case LEFTRIGHT:
	      AMnestingDepth++;
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      result = AMparseExpr(str, false);
	      AMnestingDepth--;
	      var st = "";
	      if (result[0].lastChild != null) st = result[0].lastChild.firstChild.nodeValue;
	      if (st == "|") { // its an absolute value subterm
	        node = createMmlNode("mo", symbol.output);
	        node = createMmlNode("mrow", node);
	        node.appendChild(result[0]);
	        return [node, result[1]];
	      } else { // the "|" is a \mid so use unicode 2223 (divides) for spacing
	        node = createMmlNode("mo", "\u2223");
	        node = createMmlNode("mrow", node);
	        return [node, str];
	      }
	    default:
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      //symbol.tag is a constant
	      return [createMmlNode(symbol.tag, symbol.output), str];
	  }
	}
	
	function AMparseIexpr(str) {
	  var symbol, sym1, sym2, node, result, underover;
	  str = AMremoveCharsAndBlanks(str, 0);
	  sym1 = AMgetSymbol(str);
	  result = AMparseSexpr(str);
	  node = result[0];
	  str = result[1];
	  symbol = AMgetSymbol(str);
	  if (symbol.ttype == INFIX && symbol.input != "/") {
	    str = AMremoveCharsAndBlanks(str, symbol.input.length);
	    result = AMparseSexpr(str);
	    if (result[0] == null) // show box in place of missing argument
	    result[0] = createMmlNode("mo", "\u25A1");
	    else AMremoveBrackets(result[0]);
	    str = result[1];
	    if (symbol.input == "_") {
	      sym2 = AMgetSymbol(str);
	      underover = (sym1.ttype == UNDEROVER);
	      if (sym2.input == "^") {
	        str = AMremoveCharsAndBlanks(str, sym2.input.length);
	        var res2 = AMparseSexpr(str);
	        AMremoveBrackets(res2[0]);
	        str = res2[1];
	        node = createMmlNode((underover ? "munderover" : "msubsup"), node);
	        node.appendChild(result[0]);
	        node.appendChild(res2[0]);
	        node = createMmlNode("mrow", node); // so sum does not stretch
	      } else {
	        node = createMmlNode((underover ? "munder" : "msub"), node);
	        node.appendChild(result[0]);
	      }
	    } else {
	      node = createMmlNode(symbol.tag, node);
	      node.appendChild(result[0]);
	    }
	  }
	  return [node, str];
	}
	
	function AMparseExpr(str, rightbracket) {
	  var symbol, node, result, i,
	  newFrag = createFragment();
	  do {
	    str = AMremoveCharsAndBlanks(str, 0);
	    result = AMparseIexpr(str);
	    node = result[0];
	    str = result[1];
	    symbol = AMgetSymbol(str);
	    if (symbol.ttype == INFIX && symbol.input == "/") {
	      str = AMremoveCharsAndBlanks(str, symbol.input.length);
	      result = AMparseIexpr(str);
	      if (result[0] == null) // show box in place of missing argument
	      result[0] = createMmlNode("mo", "\u25A1");
	      else AMremoveBrackets(result[0]);
	      str = result[1];
	      AMremoveBrackets(node);
	      node = createMmlNode(symbol.tag, node);
	      node.appendChild(result[0]);
	      newFrag.appendChild(node);
	      symbol = AMgetSymbol(str);
	    } else if (node != undefined) newFrag.appendChild(node);
	  } while ((symbol.ttype != RIGHTBRACKET && (symbol.ttype != LEFTRIGHT || rightbracket) || AMnestingDepth == 0) && symbol != null && symbol.output != "");
	  if (symbol.ttype == RIGHTBRACKET || symbol.ttype == LEFTRIGHT) {
	    var len = newFrag.childNodes.length;
	    if (len > 0 && newFrag.childNodes[len - 1].nodeName == "mrow" && len > 1 && newFrag.childNodes[len - 2].nodeName == "mo" && newFrag.childNodes[len - 2].firstChild.nodeValue == ",") { //matrix
	      var right = newFrag.childNodes[len - 1].lastChild.firstChild.nodeValue;
	      if (right == ")" || right == "]") {
	        var left = newFrag.childNodes[len - 1].firstChild.firstChild.nodeValue;
	        if (left == "(" && right == ")" && symbol.output != "}" || left == "[" && right == "]") {
	          var pos = []; // positions of commas
	          var matrix = true;
	          var m = newFrag.childNodes.length;
	          for (i = 0; matrix && i < m; i = i + 2) {
	            pos[i] = [];
	            node = newFrag.childNodes[i];
	            if (matrix) matrix = node.nodeName == "mrow" && (i == m - 1 || node.nextSibling.nodeName == "mo" && node.nextSibling.firstChild.nodeValue == ",") && node.firstChild.firstChild.nodeValue == left && node.lastChild.firstChild.nodeValue == right;
	            if (matrix) {
	              for (var j = 0; j < node.childNodes.length; j++) {
	                if (node.childNodes[j].firstChild.nodeValue == ",") pos[i][pos[i].length] = j;
	              }
	            }
	            if (matrix && i > 1) matrix = pos[i].length == pos[i - 2].length;
	          }
	          if (matrix) {
	            var n, k, table = createMmlNode("mtable");
	            for (i = 0; i < m; i = i + 2) {
	              var row = createMmlNode("mtr");
	              var tableCell = createMmlNode("mtd");
	              node = newFrag.firstChild; // <mrow>(-,-,...,-,-)</mrow>
	              n = node.childNodes.length;
	              k = 0;
	              node.removeChild(node.firstChild); //remove (
	              for (j = 1; j < n - 1; j++) {
	                if (typeof pos[i][k] != "undefined" && j == pos[i][k]) {
	                  node.removeChild(node.firstChild); //remove ,
	                  row.appendChild(tableCell);
	                  tableCell = createMmlNode('mtd');
	                  k++;
	                } else tableCell.appendChild(node.firstChild);
	              }
	              row.appendChild(tableCell)
	              if (newFrag.childNodes.length > 2) {
	                newFrag.removeChild(newFrag.firstChild); //remove <mrow>)</mrow>
	                newFrag.removeChild(newFrag.firstChild); //remove <mo>,</mo>
	              }
	              table.appendChild(row);
	            }
	            node = table;
	            if (typeof symbol.invisible == "boolean" && symbol.invisible) node.setAttribute("columnalign", "left");
	            newFrag.replaceChild(node, newFrag.firstChild);
	          }
	        }
	      }
	    }
	    str = AMremoveCharsAndBlanks(str, symbol.input.length);
	    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
	      node = createMmlNode("mo", symbol.output);
	      newFrag.appendChild(node);
	    }
	  }
	  return [newFrag, str];
	}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var escapeStr = __webpack_require__(59);
	
	exports.Node = Node;
	exports.Text = Text;
	
	function Node(type) {
	  this.firstChild = null;
	  this.lastChild = null;
	  this.nodeName = type;
	  this.childNodes = [];
	  this.attributes = {};
	}
	Node.prototype.toElement = function () {
	  var el = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.nodeName);
	  for (var i = 0; i < this.childNodes.length; i++) {
	    el.appendChild(this.childNodes[i].toElement());
	  }
	  var attributes = Object.keys(this.attributes);
	  for (var i = 0; i < attributes.length; i++) {
	    el.setAttribute(attributes[i], this.attributes[attributes[i]]);
	  }
	  return el;
	}
	
	Node.prototype.toString = function () {
	  var buf = [];
	  buf.push('<', this.nodeName);
	  var attributes = Object.keys(this.attributes);
	  for (var i = 0; i < attributes.length; i++) {
	    buf.push(' ', attributes[i], '="', this.attributes[attributes[i]], '"');
	  }
	  buf.push('>');
	  for (var i = 0; i < this.childNodes.length; i++) {
	    buf.push(this.childNodes[i].toString());
	  }
	
	  buf.push('</' + this.nodeName + '>');
	  return buf.join('');
	}
	
	Node.prototype.setAttribute = function (attr, val) {
	  this.attributes[attr] = val;
	};
	Node.prototype.appendChild = function (child) {
	  if (typeof child === 'string') {
	    this.appendChild(new Text(child), true);
	  } else if (child.nodeName === 'fragment') {
	    var len = child.childNodes.length;
	    for (var i = 0; i < len; i++) {
	      this.appendChild(child.childNodes[0], true);
	    }
	  } else {
	    if (child.parentNode) child.parentNode.removeChild(child);
	    child.parentNode = this;
	    this.childNodes.push(child);
	  }
	  this.updateChildNodes();
	  return child;
	};
	Node.prototype.removeChild = function (child) {
	  child.nextSibling = null;
	  var removed = false;
	  this.childNodes = this.childNodes.filter(function (c) {
	    if (!removed && c === child) {
	      removed = true;
	      return false;
	    } else {
	      return true;
	    }
	  });
	  child.parentNode = null;
	  this.updateChildNodes();
	  return child;
	}
	Node.prototype.replaceChild = function (newChild, oldChild) {
	  if (newChild.parentNode) newChild.parentNode.removeChild(child);
	  newChild.parentNode = this;
	  this.childNodes = this.childNodes.map(function (c) {
	    if (c === oldChild) return newChild;
	    else return c;
	  });
	  oldChild.parentNode = null;
	  this.updateChildNodes();
	  return oldChild;
	};
	Node.prototype.updateChildNodes = function () {
	  if (this.childNodes.length === 0) {
	    this.firstChild = null;
	    this.lastChild = null;
	  } else {
	    this.firstChild = this.childNodes[0];
	    this.lastChild = this.childNodes[this.childNodes.length - 1];
	  }
	  for (var i = 0; i < this.childNodes.length; i++) {
	    this.childNodes[i].nextSibling = this.childNodes[i+1] || null;
	  }
	};
	
	function Text(text) {
	  this.nodeValue = text;
	}
	Text.prototype.toElement = function () {
	  return document.createTextNode(this.nodeValue);
	};
	Text.prototype.toString = function () {
	  return escapeStr(this.nodeValue);
	};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	/*
	
	Generated with the code:
	
	request('http://www.escapecodes.info', function (err, res, body) {
	  if (err) throw err;
	  body = body.toString();
	  var pattern = /<span class=\"tip\">\&amp;([^;]+);<br \/>\&amp;#([^;]+);/g;
	  var match;
	
	  var lookup = {};
	  while (match = pattern.exec(body)) {
	    lookup[match[2]] = match[1];
	  }
	  fs.writeFileSync(path.join(__dirname, 'escape-lookup.json'), JSON.stringify(lookup, null, 2));
	})
	
	*/
	
	var lookup = {
	  34: 'quot',
	  38: 'amp',
	  60: 'lt',
	  62: 'gt',
	  161: 'iexcl',
	  162: 'cent',
	  163: 'pound',
	  164: 'curren',
	  165: 'yen',
	  166: 'brvbar',
	  167: 'sect',
	  168: 'uml',
	  169: 'copy',
	  170: 'ordf',
	  171: 'laquo',
	  172: 'not',
	  173: 'shy',
	  174: 'reg',
	  175: 'macr',
	  176: 'deg',
	  177: 'plusmn',
	  178: 'sup2',
	  179: 'sup3',
	  180: 'acute',
	  181: 'micro',
	  182: 'para',
	  183: 'middot',
	  184: 'cedil',
	  185: 'sup1',
	  186: 'ordm',
	  187: 'raquo',
	  188: 'frac14',
	  189: 'frac12',
	  190: 'frac34',
	  191: 'iquest',
	  192: 'Agrave',
	  193: 'Aacute',
	  194: 'Acirc',
	  195: 'Atilde',
	  196: 'Auml',
	  197: 'Aring',
	  198: 'AElig',
	  199: 'Ccedil',
	  200: 'Egrave',
	  201: 'Eacute',
	  202: 'Ecirc',
	  203: 'Euml',
	  204: 'Igrave',
	  205: 'Iacute',
	  206: 'Icirc',
	  207: 'Iuml',
	  208: 'ETH',
	  209: 'Ntilde',
	  210: 'Ograve',
	  211: 'Oacute',
	  212: 'Ocirc',
	  213: 'Otilde',
	  214: 'Ouml',
	  215: 'times',
	  216: 'Oslash',
	  217: 'Ugrave',
	  218: 'Uacute',
	  219: 'Ucirc',
	  220: 'Uuml',
	  221: 'Yacute',
	  222: 'THORN',
	  223: 'szlig',
	  224: 'agrave',
	  225: 'aacute',
	  226: 'acirc',
	  227: 'atilde',
	  228: 'auml',
	  229: 'aring',
	  230: 'aelig',
	  231: 'ccedil',
	  232: 'egrave',
	  233: 'eacute',
	  234: 'ecirc',
	  235: 'euml',
	  236: 'igrave',
	  237: 'iacute',
	  238: 'icirc',
	  239: 'iuml',
	  240: 'eth',
	  241: 'ntilde',
	  242: 'ograve',
	  243: 'oacute',
	  244: 'ocirc',
	  245: 'otilde',
	  246: 'ouml',
	  247: 'divide',
	  248: 'oslash',
	  249: 'ugrave',
	  250: 'uacute',
	  251: 'ucirc',
	  252: 'uuml',
	  253: 'yacute',
	  255: 'yuml',
	  338: 'OElig',
	  339: 'oelig',
	  352: 'Scaron',
	  353: 'scaron',
	  376: 'Yuml',
	  402: 'fnof',
	  913: 'Alpha',
	  914: 'Beta',
	  915: 'Gamma',
	  916: 'Delta',
	  917: 'Epsilon',
	  918: 'Zeta',
	  919: 'Eta',
	  920: 'Theta',
	  921: 'Iota',
	  922: 'Kappa',
	  923: 'Lambda',
	  925: 'Nu',
	  926: 'Xi',
	  927: 'Omicron',
	  928: 'Pi',
	  929: 'Rho',
	  931: 'Sigma',
	  932: 'Tau',
	  933: 'Upsilon',
	  934: 'Phi',
	  935: 'Chi',
	  936: 'Psi',
	  937: 'Omega',
	  945: 'alpha',
	  946: 'beta',
	  947: 'gamma',
	  948: 'delta',
	  949: 'epsilon',
	  950: 'zeta',
	  951: 'eta',
	  952: 'theta',
	  953: 'iota',
	  954: 'kappa',
	  955: 'lambda',
	  956: 'mu',
	  957: 'nu',
	  958: 'xi',
	  959: 'omicron',
	  960: 'pi',
	  961: 'rho',
	  962: 'sigmaf',
	  963: 'sigma',
	  964: 'tau',
	  965: 'upsilon',
	  966: 'phi',
	  967: 'chi',
	  968: 'psi',
	  969: 'omega',
	  977: 'thetasym',
	  978: 'upsih',
	  982: 'piv',
	  8211: 'ndash',
	  8212: 'mdash',
	  8216: 'lsquo',
	  8217: 'rsquo',
	  8218: 'sbquo',
	  8220: 'ldquo',
	  8221: 'rdquo',
	  8222: 'bdquo',
	  8224: 'dagger',
	  8225: 'Dagger',
	  8240: 'permil',
	  8249: 'lsaquo',
	  8250: 'rsaquo',
	  8364: 'euro',
	  8465: 'image',
	  8472: 'weierp',
	  8476: 'real',
	  8482: 'trade',
	  8501: 'alefsym',
	  8592: 'larr',
	  8593: 'uarr',
	  8594: 'rarr',
	  8595: 'darr',
	  8596: 'harr',
	  8629: 'crarr',
	  8656: 'lArr',
	  8657: 'uArr',
	  8658: 'rArr',
	  8659: 'dArr',
	  8660: 'hArr',
	  8704: 'forall',
	  8706: 'part',
	  8707: 'exist',
	  8709: 'empty',
	  8711: 'nabla',
	  8712: 'isin',
	  8713: 'notin',
	  8715: 'ni',
	  8719: 'prod',
	  8721: 'sum',
	  8722: 'minus',
	  8727: 'lowast',
	  8730: 'radic',
	  8733: 'prop',
	  8734: 'infin',
	  8736: 'ang',
	  8743: 'and',
	  8744: 'or',
	  8745: 'cap',
	  8746: 'cup',
	  8747: 'int',
	  8756: 'there4',
	  8764: 'sim',
	  8773: 'cong',
	  8776: 'asymp',
	  8800: 'ne',
	  8801: 'equiv',
	  8804: 'le',
	  8805: 'ge',
	  8834: 'sub',
	  8835: 'sup',
	  8836: 'nsub',
	  8838: 'sube',
	  8839: 'supe',
	  8853: 'oplus',
	  8855: 'otimes',
	  8869: 'perp',
	  8901: 'sdot',
	  8968: 'lceil',
	  8969: 'rceil',
	  8970: 'lfloor',
	  8971: 'rfloor',
	  9001: 'lang',
	  9002: 'rang',
	  9674: 'loz',
	  9824: 'spades',
	  9827: 'clubs',
	  9829: 'hearts',
	  9830: 'diams'
	};
	
	module.exports = HTMLEncode;
	function HTMLEncode(str){
	  var i = str.length,
	      aRet = [];
	
	  while (i--) {
	    var iC = str.charCodeAt(i);
	    if (lookup[iC]) {
	      aRet[i] = '&' + lookup[iC] + ';';
	    } else if (iC > 127) { //See: http://en.wikipedia.org/wiki/List_of_Unicode_characters for list of unicode characters
	      aRet[i] = '&#' + iC + ';';
	    } else {
	      aRet[i] = str[i];
	    }
	   }
	  return aRet.join('');    
	}

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	exports.CONST = 0;
	exports.UNARY = 1;
	exports.BINARY = 2;
	exports.INFIX = 3;
	exports.LEFTBRACKET = 4;
	exports.RIGHTBRACKET = 5;
	exports.SPACE = 6;
	exports.UNDEROVER = 7;
	exports.DEFINITION = 8;
	exports.LEFTRIGHT = 9;
	exports.TEXT = 10;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var tokenTypes = __webpack_require__(60);
	var CONST = tokenTypes.CONST;
	var UNARY = tokenTypes.UNARY;
	var BINARY = tokenTypes.BINARY;
	var INFIX = tokenTypes.INFIX;
	var LEFTBRACKET = tokenTypes.LEFTBRACKET;
	var RIGHTBRACKET = tokenTypes.RIGHTBRACKET;
	var SPACE = tokenTypes.SPACE;
	var UNDEROVER = tokenTypes.UNDEROVER;
	var DEFINITION = tokenTypes.DEFINITION;
	var LEFTRIGHT = tokenTypes.LEFTRIGHT;
	var TEXT = tokenTypes.TEXT;
	
	// character lists for Mozilla/Netscape fonts
	var AMcal = [0xEF35, 0x212C, 0xEF36, 0xEF37, 0x2130, 0x2131, 0xEF38, 0x210B, 0x2110, 0xEF39, 0xEF3A, 0x2112, 0x2133, 0xEF3B, 0xEF3C, 0xEF3D, 0xEF3E, 0x211B, 0xEF3F, 0xEF40, 0xEF41, 0xEF42, 0xEF43, 0xEF44, 0xEF45, 0xEF46];
	var AMfrk = [0xEF5D, 0xEF5E, 0x212D, 0xEF5F, 0xEF60, 0xEF61, 0xEF62, 0x210C, 0x2111, 0xEF63, 0xEF64, 0xEF65, 0xEF66, 0xEF67, 0xEF68, 0xEF69, 0xEF6A, 0x211C, 0xEF6B, 0xEF6C, 0xEF6D, 0xEF6E, 0xEF6F, 0xEF70, 0xEF71, 0x2128];
	var AMbbb = [0xEF8C, 0xEF8D, 0x2102, 0xEF8E, 0xEF8F, 0xEF90, 0xEF91, 0x210D, 0xEF92, 0xEF93, 0xEF94, 0xEF95, 0xEF96, 0x2115, 0xEF97, 0x2119, 0x211A, 0x211D, 0xEF98, 0xEF99, 0xEF9A, 0xEF9B, 0xEF9C, 0xEF9D, 0xEF9E, 0x2124];
	
	
	var symbols = [
	  //some greek symbols
	
	  {input: "alpha", tag: "mi", output: "\u03B1", tex: null, ttype: CONST}, 
	  {input: "beta", tag: "mi", output: "\u03B2", tex: null, ttype: CONST}, 
	  {input: "chi", tag: "mi", output: "\u03C7", tex: null, ttype: CONST}, 
	  {input: "delta", tag: "mi", output: "\u03B4", tex: null, ttype: CONST}, 
	  {input: "Delta", tag: "mo", output: "\u0394", tex: null, ttype: CONST}, 
	  {input: "epsi", tag: "mi", output: "\u03B5", tex: "epsilon", ttype: CONST}, 
	  {input: "varepsilon", tag: "mi", output: "\u025B", tex: null, ttype: CONST}, 
	  {input: "eta", tag: "mi", output: "\u03B7", tex: null, ttype: CONST}, 
	  {input: "gamma", tag: "mi", output: "\u03B3", tex: null, ttype: CONST}, 
	  {input: "Gamma", tag: "mo", output: "\u0393", tex: null, ttype: CONST}, 
	  {input: "iota", tag: "mi", output: "\u03B9", tex: null, ttype: CONST}, 
	  {input: "kappa", tag: "mi", output: "\u03BA", tex: null, ttype: CONST}, 
	  {input: "lambda", tag: "mi", output: "\u03BB", tex: null, ttype: CONST}, 
	  {input: "Lambda", tag: "mo", output: "\u039B", tex: null, ttype: CONST}, 
	  {input: "mu", tag: "mi", output: "\u03BC", tex: null, ttype: CONST}, 
	  {input: "nu", tag: "mi", output: "\u03BD", tex: null, ttype: CONST}, 
	  {input: "omega", tag: "mi", output: "\u03C9", tex: null, ttype: CONST}, 
	  {input: "Omega", tag: "mo", output: "\u03A9", tex: null, ttype: CONST}, 
	  {input: "phi", tag: "mi", output: "\u03C6", tex: null, ttype: CONST}, 
	  {input: "varphi", tag: "mi", output: "\u03D5", tex: null, ttype: CONST}, 
	  {input: "Phi", tag: "mo", output: "\u03A6", tex: null, ttype: CONST}, 
	  {input: "pi", tag: "mi", output: "\u03C0", tex: null, ttype: CONST}, 
	  {input: "Pi", tag: "mo", output: "\u03A0", tex: null, ttype: CONST}, 
	  {input: "psi", tag: "mi", output: "\u03C8", tex: null, ttype: CONST}, 
	  {input: "Psi", tag: "mi", output: "\u03A8", tex: null, ttype: CONST}, 
	  {input: "rho", tag: "mi", output: "\u03C1", tex: null, ttype: CONST}, 
	  {input: "sigma", tag: "mi", output: "\u03C3", tex: null, ttype: CONST}, 
	  {input: "Sigma", tag: "mo", output: "\u03A3", tex: null, ttype: CONST}, 
	  {input: "tau", tag: "mi", output: "\u03C4", tex: null, ttype: CONST}, 
	  {input: "theta", tag: "mi", output: "\u03B8", tex: null, ttype: CONST}, 
	  {input: "vartheta", tag: "mi", output: "\u03D1", tex: null, ttype: CONST}, 
	  {input: "Theta", tag: "mo", output: "\u0398", tex: null, ttype: CONST}, 
	  {input: "upsilon", tag: "mi", output: "\u03C5", tex: null, ttype: CONST}, 
	  {input: "xi", tag: "mi", output: "\u03BE", tex: null, ttype: CONST}, 
	  {input: "Xi", tag: "mo", output: "\u039E", tex: null, ttype: CONST}, 
	  {input: "zeta", tag: "mi", output: "\u03B6", tex: null, ttype: CONST},
	
	  //binary operation symbols
	  //{input:"-",  tag:"mo", output:"\u0096", tex:null, ttype:CONST},
	
	  {input: "*", tag: "mo", output: "\u22C5", tex: "cdot", ttype: CONST}, 
	  {input: "**", tag: "mo", output: "\u22C6", tex: "star", ttype: CONST}, 
	  {input: "//", tag: "mo", output: "/", tex: null, ttype: CONST}, 
	  {input: "\\\\", tag: "mo", output: "\\", tex: "backslash", ttype: CONST}, 
	  {input: "setminus", tag: "mo", output: "\\", tex: null, ttype: CONST}, 
	  {input: "xx", tag: "mo", output: "\u00D7", tex: "times", ttype: CONST}, 
	  {input: "-:", tag: "mo", output: "\u00F7", tex: "divide", ttype: CONST}, 
	  {input: "@", tag: "mo", output: "\u26AC", tex: "circ", ttype: CONST}, 
	  {input: "o+", tag: "mo", output: "\u2295", tex: "oplus", ttype: CONST}, 
	  {input: "ox", tag: "mo", output: "\u2297", tex: "otimes", ttype: CONST}, 
	  {input: "o.", tag: "mo", output: "\u2299", tex: "odot", ttype: CONST}, 
	  {input: "sum", tag: "mo", output: "\u2211", tex: null, ttype: UNDEROVER}, 
	  {input: "prod", tag: "mo", output: "\u220F", tex: null, ttype: UNDEROVER}, 
	  {input: "^^", tag: "mo", output: "\u2227", tex: "wedge", ttype: CONST}, 
	  {input: "^^^", tag: "mo", output: "\u22C0", tex: "bigwedge", ttype: UNDEROVER}, 
	  {input: "vv", tag: "mo", output: "\u2228", tex: "vee", ttype: CONST}, 
	  {input: "vvv", tag: "mo", output: "\u22C1", tex: "bigvee", ttype: UNDEROVER}, 
	  {input: "nn", tag: "mo", output: "\u2229", tex: "cap", ttype: CONST}, 
	  {input: "nnn", tag: "mo", output: "\u22C2", tex: "bigcap", ttype: UNDEROVER}, 
	  {input: "uu", tag: "mo", output: "\u222A", tex: "cup", ttype: CONST}, 
	  {input: "uuu", tag: "mo", output: "\u22C3", tex: "bigcup", ttype: UNDEROVER},
	
	  //binary relation symbols
	
	  {input: "!=", tag: "mo", output: "\u2260", tex: "ne", ttype: CONST}, 
	  {input: ":=", tag: "mo", output: ":=", tex: null, ttype: CONST}, 
	  {input: "lt", tag: "mo", output: "<", tex: null, ttype: CONST}, 
	  {input: "<=", tag: "mo", output: "\u2264", tex: "le", ttype: CONST}, 
	  {input: "lt=", tag: "mo", output: "\u2264", tex: "leq", ttype: CONST}, 
	  {input: ">=", tag: "mo", output: "\u2265", tex: "ge", ttype: CONST}, 
	  {input: "geq", tag: "mo", output: "\u2265", tex: null, ttype: CONST}, 
	  {input: "-<", tag: "mo", output: "\u227A", tex: "prec", ttype: CONST}, 
	  {input: "-lt", tag: "mo", output: "\u227A", tex: null, ttype: CONST}, 
	  {input: ">-", tag: "mo", output: "\u227B", tex: "succ", ttype: CONST}, 
	  {input: "-<=", tag: "mo", output: "\u2AAF", tex: "preceq", ttype: CONST}, 
	  {input: ">-=", tag: "mo", output: "\u2AB0", tex: "succeq", ttype: CONST}, 
	  {input: "in", tag: "mo", output: "\u2208", tex: null, ttype: CONST}, 
	  {input: "!in", tag: "mo", output: "\u2209", tex: "notin", ttype: CONST}, 
	  {input: "sub", tag: "mo", output: "\u2282", tex: "subset", ttype: CONST}, 
	  {input: "sup", tag: "mo", output: "\u2283", tex: "supset", ttype: CONST}, 
	  {input: "sube", tag: "mo", output: "\u2286", tex: "subseteq", ttype: CONST}, 
	  {input: "supe", tag: "mo", output: "\u2287", tex: "supseteq", ttype: CONST}, 
	  {input: "-=", tag: "mo", output: "\u2261", tex: "equiv", ttype: CONST}, 
	  {input: "~=", tag: "mo", output: "\u2245", tex: "cong", ttype: CONST}, 
	  {input: "~~", tag: "mo", output: "\u2248", tex: "approx", ttype: CONST}, 
	  {input: "prop", tag: "mo", output: "\u221D", tex: "propto", ttype: CONST},
	
	  //logical symbols
	
	  {input: "and", tag: "mtext", output: "and", tex: null, ttype: SPACE}, 
	  {input: "or", tag: "mtext", output: "or", tex: null, ttype: SPACE}, 
	  {input: "not", tag: "mo", output: "\u00AC", tex: "neg", ttype: CONST}, 
	  {input: "=>", tag: "mo", output: "\u21D2", tex: "implies", ttype: CONST}, 
	  {input: "if", tag: "mo", output: "if", tex: null, ttype: SPACE}, 
	  {input: "<=>", tag: "mo", output: "\u21D4", tex: "iff", ttype: CONST}, 
	  {input: "AA", tag: "mo", output: "\u2200", tex: "forall", ttype: CONST}, 
	  {input: "EE", tag: "mo", output: "\u2203", tex: "exists", ttype: CONST}, 
	  {input: "_|_", tag: "mo", output: "\u22A5", tex: "bot", ttype: CONST}, 
	  {input: "TT", tag: "mo", output: "\u22A4", tex: "top", ttype: CONST}, 
	  {input: "|--", tag: "mo", output: "\u22A2", tex: "vdash", ttype: CONST}, 
	  {input: "|==", tag: "mo", output: "\u22A8", tex: "models", ttype: CONST},
	
	  //grouping brackets
	
	  {input: "(", tag: "mo", output: "(", tex: null, ttype: LEFTBRACKET}, 
	  {input: ")", tag: "mo", output: ")", tex: null, ttype: RIGHTBRACKET}, 
	  {input: "[", tag: "mo", output: "[", tex: null, ttype: LEFTBRACKET}, 
	  {input: "]", tag: "mo", output: "]", tex: null, ttype: RIGHTBRACKET}, 
	  {input: "{", tag: "mo", output: "{", tex: null, ttype: LEFTBRACKET}, 
	  {input: "}", tag: "mo", output: "}", tex: null, ttype: RIGHTBRACKET}, 
	  {input: "|", tag: "mo", output: "|", tex: null, ttype: LEFTRIGHT},
	  //{input:"||", tag:"mo", output:"||", tex:null, ttype:LEFTRIGHT},
	
	  {input: "(:", tag: "mo", output: "\u2329", tex: "langle", ttype: LEFTBRACKET},
	  {input: ":)", tag: "mo", output: "\u232A", tex: "rangle", ttype: RIGHTBRACKET},
	  {input: "<<", tag: "mo", output: "\u2329", tex: null, ttype: LEFTBRACKET},
	  {input: ">>", tag: "mo", output: "\u232A", tex: null, ttype: RIGHTBRACKET},
	  {input: "{:", tag: "mo", output: "{:", tex: null, ttype: LEFTBRACKET, invisible: true},
	  {input: ":}", tag: "mo", output: ":}", tex: null, ttype: RIGHTBRACKET, invisible: true},
	
	  //miscellaneous symbols
	
	  {input: "int", tag: "mo", output: "\u222B", tex: null, ttype: CONST}, 
	  {input: "dx", tag: "mi", output: "{:d x:}", tex: null, ttype: DEFINITION}, 
	  {input: "dy", tag: "mi", output: "{:d y:}", tex: null, ttype: DEFINITION}, 
	  {input: "dz", tag: "mi", output: "{:d z:}", tex: null, ttype: DEFINITION}, 
	  {input: "dt", tag: "mi", output: "{:d t:}", tex: null, ttype: DEFINITION}, 
	  {input: "oint", tag: "mo", output: "\u222E", tex: null, ttype: CONST}, 
	  {input: "del", tag: "mo", output: "\u2202", tex: "partial", ttype: CONST}, 
	  {input: "grad", tag: "mo", output: "\u2207", tex: "nabla", ttype: CONST}, 
	  {input: "+-", tag: "mo", output: "\u00B1", tex: "pm", ttype: CONST}, 
	  {input: "O/", tag: "mo", output: "\u2205", tex: "emptyset", ttype: CONST}, 
	  {input: "oo", tag: "mo", output: "\u221E", tex: "infty", ttype: CONST}, 
	  {input: "aleph", tag: "mo", output: "\u2135", tex: null, ttype: CONST}, 
	  {input: "...", tag: "mo", output: "...", tex: "ldots", ttype: CONST}, 
	  {input: ":.", tag: "mo", output: "\u2234", tex: "therefore", ttype: CONST}, 
	  {input: "/_", tag: "mo", output: "\u2220", tex: "angle", ttype: CONST}, 
	  {input: "\\ ", tag: "mo", output: "\u00A0", tex: null, ttype: CONST}, 
	  {input: "quad", tag: "mo", output: "\u00A0\u00A0", tex: null, ttype: CONST}, 
	  {input: "qquad", tag: "mo", output: "\u00A0\u00A0\u00A0\u00A0", tex: null, ttype: CONST}, 
	  {input: "cdots", tag: "mo", output: "\u22EF", tex: null, ttype: CONST}, 
	  {input: "vdots", tag: "mo", output: "\u22EE", tex: null, ttype: CONST}, 
	  {input: "ddots", tag: "mo", output: "\u22F1", tex: null, ttype: CONST}, 
	  {input: "diamond", tag: "mo", output: "\u22C4", tex: null, ttype: CONST}, 
	  {input: "square", tag: "mo", output: "\u25A1", tex: null, ttype: CONST}, 
	  {input: "|__", tag: "mo", output: "\u230A", tex: "lfloor", ttype: CONST}, 
	  {input: "__|", tag: "mo", output: "\u230B", tex: "rfloor", ttype: CONST}, 
	  {input: "|~", tag: "mo", output: "\u2308", tex: "lceiling", ttype: CONST}, 
	  {input: "~|", tag: "mo", output: "\u2309", tex: "rceiling", ttype: CONST}, 
	  {input: "CC", tag: "mo", output: "\u2102", tex: null, ttype: CONST}, 
	  {input: "NN", tag: "mo", output: "\u2115", tex: null, ttype: CONST}, 
	  {input: "QQ", tag: "mo", output: "\u211A", tex: null, ttype: CONST}, 
	  {input: "RR", tag: "mo", output: "\u211D", tex: null, ttype: CONST}, 
	  {input: "ZZ", tag: "mo", output: "\u2124", tex: null, ttype: CONST},
	  {input: "f", tag: "mi", output: "f", tex: null, ttype: UNARY, func: true},
	  {input: "g", tag: "mi", output: "g", tex: null, ttype: UNARY, func: true},
	
	  //standard functions
	
	  {input: "lim", tag: "mo", output: "lim", tex: null, ttype: UNDEROVER}, 
	  {input: "Lim", tag: "mo", output: "Lim", tex: null, ttype: UNDEROVER},
	  {input: "sin", tag: "mo", output: "sin", tex: null, ttype: UNARY, func: true},
	  {input: "cos", tag: "mo", output: "cos", tex: null, ttype: UNARY, func: true},
	  {input: "tan", tag: "mo", output: "tan", tex: null, ttype: UNARY, func: true},
	  {input: "sinh", tag: "mo", output: "sinh", tex: null, ttype: UNARY, func: true},
	  {input: "cosh", tag: "mo", output: "cosh", tex: null, ttype: UNARY, func: true},
	  {input: "tanh", tag: "mo", output: "tanh", tex: null, ttype: UNARY, func: true},
	  {input: "cot", tag: "mo", output: "cot", tex: null, ttype: UNARY, func: true},
	  {input: "sec", tag: "mo", output: "sec", tex: null, ttype: UNARY, func: true},
	  {input: "csc", tag: "mo", output: "csc", tex: null, ttype: UNARY, func: true},
	  {input: "log", tag: "mo", output: "log", tex: null, ttype: UNARY, func: true},
	  {input: "ln", tag: "mo", output: "ln", tex: null, ttype: UNARY, func: true},
	  {input: "det", tag: "mo", output: "det", tex: null, ttype: UNARY, func: true}, 
	  {input: "dim", tag: "mo", output: "dim", tex: null, ttype: CONST}, 
	  {input: "mod", tag: "mo", output: "mod", tex: null, ttype: CONST},
	  {input: "gcd", tag: "mo", output: "gcd", tex: null, ttype: UNARY, func: true},
	  {input: "lcm", tag: "mo", output: "lcm", tex: null, ttype: UNARY, func: true}, 
	  {input: "lub", tag: "mo", output: "lub", tex: null, ttype: CONST}, 
	  {input: "glb", tag: "mo", output: "glb", tex: null, ttype: CONST}, 
	  {input: "min", tag: "mo", output: "min", tex: null, ttype: UNDEROVER}, 
	  {input: "max", tag: "mo", output: "max", tex: null, ttype: UNDEROVER},
	
	  //arrows
	
	  {input: "uarr", tag: "mo", output: "\u2191", tex: "uparrow", ttype: CONST}, 
	  {input: "darr", tag: "mo", output: "\u2193", tex: "downarrow", ttype: CONST}, 
	  {input: "rarr", tag: "mo", output: "\u2192", tex: "rightarrow", ttype: CONST}, 
	  {input: "->", tag: "mo", output: "\u2192", tex: "to", ttype: CONST}, 
	  {input: ">->", tag: "mo", output: "\u21A3", tex: "rightarrowtail", ttype: CONST}, 
	  {input: "->>", tag: "mo", output: "\u21A0", tex: "twoheadrightarrow", ttype: CONST}, 
	  {input: ">->>", tag: "mo", output: "\u2916", tex: "twoheadrightarrowtail", ttype: CONST}, 
	  {input: "|->", tag: "mo", output: "\u21A6", tex: "mapsto", ttype: CONST}, 
	  {input: "larr", tag: "mo", output: "\u2190", tex: "leftarrow", ttype: CONST}, 
	  {input: "harr", tag: "mo", output: "\u2194", tex: "leftrightarrow", ttype: CONST}, 
	  {input: "rArr", tag: "mo", output: "\u21D2", tex: "Rightarrow", ttype: CONST}, 
	  {input: "lArr", tag: "mo", output: "\u21D0", tex: "Leftarrow", ttype: CONST}, 
	  {input: "hArr", tag: "mo", output: "\u21D4", tex: "Leftrightarrow", ttype: CONST},
	  //commands with argument
	
	  {input: "sqrt", tag: "msqrt", output: "sqrt", tex: null, ttype: UNARY}, 
	  {input: "root", tag: "mroot", output: "root", tex: null, ttype: BINARY}, 
	  {input: "frac", tag: "mfrac", output: "/", tex: null, ttype: BINARY}, 
	  {input: "/", tag: "mfrac", output: "/", tex: null, ttype: INFIX}, 
	  {input: "stackrel", tag: "mover", output: "stackrel", tex: null, ttype: BINARY}, 
	  {input: "_", tag: "msub", output: "_", tex: null, ttype: INFIX}, 
	  {input: "^", tag: "msup", output: "^", tex: null, ttype: INFIX},
	  {input: "hat", tag: "mover", output: "^", tex: null, ttype: UNARY, acc: true},
	  {input: "bar", tag: "mover", output: "\u00AF", tex: "overline", ttype: UNARY, acc: true},
	  {input: "vec", tag: "mover", output: "\u2192", tex: null, ttype: UNARY, acc: true},
	  {input: "line", tag: "mover", output: "\u2194", tex: null, ttype: UNARY, acc: true},
	  {input: "dot", tag: "mover", output: ".", tex: null, ttype: UNARY, acc: true},
	  {input: "ddot", tag: "mover", output: "..", tex: null, ttype: UNARY, acc: true},
	  {input: "ul", tag: "munder", output: "\u0332", tex: "underline", ttype: UNARY, acc: true}, 
	  {input: "text", tag: "mtext", output: "text", tex: null, ttype: TEXT}, 
	  {input: "mbox", tag: "mtext", output: "mbox", tex: null, ttype: TEXT},
	  {input: "\"", tag: "mtext", output: "mbox", tex: null, ttype: TEXT},
	  {input: "bb", tag: "mstyle", atname: "fontweight", atval: "bold", output: "bb", tex: null, ttype: UNARY},
	  {input: "mathbf", tag: "mstyle", atname: "fontweight", atval: "bold", output: "mathbf", tex: null, ttype: UNARY},
	  {input: "sf", tag: "mstyle", atname: "fontfamily", atval: "sans-serif", output: "sf", tex: null, ttype: UNARY},
	  {input: "mathsf", tag: "mstyle", atname: "fontfamily", atval: "sans-serif", output: "mathsf", tex: null, ttype: UNARY},
	  {input: "bbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "bbb", tex: null, ttype: UNARY, codes: AMbbb},
	  {input: "mathbb", tag: "mstyle", atname: "mathvariant", atval: "double-struck", output: "mathbb", tex: null, ttype: UNARY, codes: AMbbb},
	  {input: "cc", tag: "mstyle", atname: "mathvariant", atval: "script", output: "cc", tex: null, ttype: UNARY, codes: AMcal},
	  {input: "mathcal", tag: "mstyle", atname: "mathvariant", atval: "script", output: "mathcal", tex: null, ttype: UNARY, codes: AMcal},
	  {input: "tt", tag: "mstyle", atname: "fontfamily", atval: "monospace", output: "tt", tex: null, ttype: UNARY},
	  {input: "mathtt", tag: "mstyle", atname: "fontfamily", atval: "monospace", output: "mathtt", tex: null, ttype: UNARY},
	  {input: "fr", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "fr", tex: null, ttype: UNARY, codes: AMfrk},
	  {input: "mathfrak", tag: "mstyle", atname: "mathvariant", atval: "fraktur", output: "mathfrak", tex: null, ttype: UNARY, codes: AMfrk}
	];
	
	var texsymbols = [];
	for (var i = 0; i < symbols.length; i++) {
	  if (symbols[i].tex) {
	    texsymbols.push({
	      input: symbols[i].tex,
	      tag: symbols[i].tag,
	      output: symbols[i].output,
	      ttype: symbols[i].ttype
	    });
	  }
	}
	symbols = symbols.concat(texsymbols);
	symbols.sort(compareNames);
	
	module.exports = symbols;
	
	function compareNames(s1, s2) {
	  if (s1.input > s2.input) return 1;
	  else return -1;
	}


/***/ })
/******/ ])
});
;
//# sourceMappingURL=met.js.map