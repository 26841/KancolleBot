const birthdays = require('./birthday.json');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send(birthdays._1._6);
	},
};
