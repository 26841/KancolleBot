const translate = require('yandex-translate')(trnsl.1.1.20191113T094553Z.4e217d4c8f27d2a9.3b2dc75be88ece54ef9f7e709859a443c4886239);

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
