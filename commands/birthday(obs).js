const birthdays = require('../birthday.json');
const Discord = require('discord.js');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {
	name: 'birthday(obs)',
	description: 'Birthday search function (obs)',
	cooldown: 5,
	execute(message, args) {
		const d = new Date();
		let month;
		let day;
		if (!args.length) {
			month = d.getMonth() + 1;
			day = d.getDate();
		}
		else if (args.length == 2) {
			month = args[0];
			day = args[1];
		}
		else {
			return message.reply('You need to provide a month and a day!');
		}
		const obj = birthdays[`${month}`][`${day}`];
		if (obj) {
			const richembed = new Discord.RichEmbed()
				.setTitle('Here\'s everyone with a birthday on ' + months[month - 1] + ' ' + day);
			for (const key in obj) {
				const title = key + ' - ' + obj[key];
				const birthday = new Date(obj[key], month, day);
				const age_dt = new Date(Date.now() - birthday.getTime());
				const age = Math.abs(age_dt.getUTCFullYear() - 1970);
				const snippet = 'Currently ' + age + ' years old';
				richembed.addField(title, snippet);
			}
			message.channel.send(richembed);
		}
		else {message.channel.send('No one has a birthday on ' + months[month - 1] + ' ' + day + '!');}
	},
};
