const birthdays = require('../birthday.json');
const Discord = require('discord.js');
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
			const richembed = new Discord.RichEmbed()
				.setTitle('Here\'s everyone with a birthday on ' + month[args[0] - 1] + ' ' + args[1])
				.setTimestamp();
			for (const key in obj) {
				const title = key + ' - ' + obj[key];
				const snippet = 'Approximately ' + (new Date().getFullYear() - obj[key]) + 'years old';
				richembed.addField(title, snippet);
			}
			message.channel.send(richembed);
		}
		else {message.channel.send('No one has a birthday that day!');}
	},
};
