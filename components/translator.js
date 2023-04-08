const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
const britishToAmericanSpelling = require('./british-to-american-spelling.js');
const britishToAmericanTitles = require('./british-to-american-titles.js');

class Translator {

    translate(text, locale) {
        let dicts = [];
        if (locale == 'american-to-british') {
            dicts.push(americanOnly, americanToBritishSpelling, americanToBritishTitles);
            text = text.replace(/(\d?\d):(\d\d)/, '<span class="highlight">$1.$2</span>');
        } else {
            dicts.push(britishOnly, britishToAmericanSpelling, britishToAmericanTitles);
            text = text.replace(/(\d?\d).(\d\d)/, '<span class="highlight">$1:$2</span>');
        }
        for (const dict of dicts) {
            for (const item of dict) {
                text = text.replace(new RegExp(`([^A-Za-z])${item[0]}([^A-Za-z])`, 'gi'), `$1<span class="highlight">${item[1]}</span>$2`);
                text = text.replace(new RegExp(`^${item[0]}([^A-Za-z])`, 'gi'), `<span class="highlight">${item[1]}</span>$1`);
                text = text.replace(new RegExp(`([^A-Za-z])${item[0]}$`, 'gi'), `$1<span class="highlight">${item[1]}</span>`);
            }
        }
        return text;
    }

}

module.exports = Translator;