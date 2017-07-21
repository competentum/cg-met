/**
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