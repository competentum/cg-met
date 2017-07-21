/**
 * Created by Shayakhmetov on 05.12.2016.
 */

var MATH = {
    en: require('./math/en'),
    es: require('./math/es'),
    ru: require('./math/ru')
};
var TEXT = require('./text');

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