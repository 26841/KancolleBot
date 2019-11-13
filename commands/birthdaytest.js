const birthdays = require('../birthday.json');

module.exports = {
	name: 'birthdaytest',
	description: 'Json read test',
	cooldown: 5,
	execute(message, args) {
		if (args.length != 2) {
			message.reply('Please provide a month and a day in numbers!');
		}
		const obj = birthdays.args[0].args[1];
		console.log(obj);
		for (const key in obj) {
			message.channel.send(' name = ' + key + ' year = ' + obj[key]);
		}
	},
};
