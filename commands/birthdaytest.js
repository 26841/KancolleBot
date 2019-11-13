const birthdays = require('../birthday.json');

module.exports = {
	name: 'birthdaytest',
	description: 'Json read test',
	cooldown: 5,
	execute(message, args) {
		if (args.length != 2) {
			message.reply('Please provide a month and a day in numbers!');
		}
		console.log(args);
		const obj = birthdays['_' + args[0]]['_' + args[1]];
		console.log(obj);
		if (obj) {
			for (const key in obj) {
				message.channel.send(' name = ' + key + ' year = ' + obj[key]);
			}
		}
		else {message.channel.send('No one has a birthday that day!');}
	},
};
