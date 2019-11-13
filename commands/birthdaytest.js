const birthdays = require('./birthday.json');

module.exports = {
	name: 'birthdaytest',
	description: 'Json read test ',
	cooldown: 5,
	execute(message) {
		message.channel.send(birthdays._1._6);
	},
};
