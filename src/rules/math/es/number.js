/**
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