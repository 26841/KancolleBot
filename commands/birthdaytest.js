const birthdays = require('../birthday.json');

module.exports = {
	name: 'birthdaytest',
	description: 'Json read test',
	cooldown: 5,
	execute(message) {
		const obj = birthdays._1._6;
		console.log(obj);
		for (const key in obj) {
			message.channel.send(' name = ' + key + ' year = ' + obj[key]);
		}
	},
};
