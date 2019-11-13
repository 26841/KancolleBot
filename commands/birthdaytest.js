const birthdays = require('../birthday.json');
const Discord = require('discord.js');
const richembed = new Discord.RichEmbed()
	.setTitle('Birthdays')
	.setDescription('Test')
	.setTimestamp();

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
				const title = key;
				const snippet = obj[key];
				richembed.addField(title, snippet);
			}
			message.channel.send(richembed);
		}
		else {message.channel.send('No one has a birthday that day!');}
	},
};
