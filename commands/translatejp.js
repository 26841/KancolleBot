const translate = require('translate');
translate.engine = 'yandex';
translate.key = process.env.TRANSLATE_KEY;

module.exports = {
	name: 'translatejp',
	description: 'Translate from japanese',
	cooldown: 5,
	execute(message, args) {
		const phrase = args.join(' ');
		const translated = translate(phrase, { from: 'ja', to: 'en' });
		message.channel.send(translated);
	},
};
