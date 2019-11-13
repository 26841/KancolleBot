const Discord = require('discord.js');
const d = new Date();
const birthdays = require('../birthday2.json');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
	name: 'birth',
	description: 'Birthday search function',
	cooldown: 5,
	execute(message, args) {
		if (!args.length) {
			return message.reply('Please enter a name to search!');
		}
		else {
			const name = args.join(' ');
			console.log(name);
			for (let i = 0; i < birthdays.length; i++) {
				if (birthdays[i].Name === name) {
					message.channel.send(birthdays[i].Month + ' ' + birthdays[i].Day + ' ' + birthdays[i].Year);
				}
			}
			return message.reply('Cannot find name.');
		}
	},
};
