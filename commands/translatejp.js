const translate = require('yandex-translate')(TRANSLATE_KEY);

module.exports = {
	name: 'translatejp',
	description: 'Translate from japanese',
	cooldown: 5,
	execute(message, args) {
		if (args.length) {
			const phrase = args.join(' ');
            translate.translate(phrase, { to: 'en' }, function(err, res) {
                console.log(res.text);
            });
		}
		else {return message.reply('Add something to translate!');}
	},
};
