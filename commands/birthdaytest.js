const birthdays = require('../birthday.json');
const Discord = require('discord.js');
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
	name: 'birthdaytest',
	description: 'Json read test',
	cooldown: 5,
	execute(message, args) {
		if (!args.length || args.length != 2) {
			return message.reply('You need to provide a month and day!');
		}
		console.log(args);
		const obj = birthdays['_' + args[0]]['_' + args[1]];
		console.log(obj);
		if (obj) {
			const richembed = new Discord.RichEmbed()
				.setTitle('Here\'s everyone with a birthday on ' + month[args[0] - 1] + ' ' + args[1]);
			for (const key in obj) {
				const title = key + ' - ' + obj[key];
				const birthday = new Date(obj[key], args[0], args[1]);
				const age_dt = new Date(Date.now() - birthday.getTime());
				const age = Math.abs(age_dt.getUTCFullYear() - 1970);
				const snippet = 'Currently ' + age + ' years old';
				richembed.addField(title, snippet);
			}
			message.channel.send(richembed);
		}
		else {message.channel.send('No one has a birthday that day!');}
	},
};
