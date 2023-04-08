'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;
      if (!req.body.hasOwnProperty('text') || !req.body.hasOwnProperty('locale')) {
        return res.json({ error: 'Required field(s) missing' });
      }
      if (!text) {
        return res.json({ error: 'No text to translate' });
      }
      if (!(locale == 'american-to-british' || locale == 'british-to-american')) {
        return res.json({ error: 'Invalid value for locale field' });
      }
      const translation = translator.translate(text, locale)
      if (translation == text) {
        return res.json({
          text,
          translation: 'Everything looks good to me!'
        });
      }
      res.json({
        text,
        translation
      });
    });
};
