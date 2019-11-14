const Discord = require('discord.js');
const d = new Date();
const birthdays = require('../birthday.json');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function ordinal(date) {
	return (date > 20 || date < 10) ? ([false, 'st', 'nd', 'rd'])[(date % 10)] || 'th' : 'th';
}

module.exports = {
	name: 'birthday',
	description: 'Birthday search function',
	cooldown: 5,
	execute(message, args) {
		let month;
		let day;

		if (args.length == 2) {
			month = args[0];
			day = args[1];
		}
		else if (!args.length) {
			month = d.getMonth() + 1;
			day = d.getDate();
		}
		else {
			return message.reply('Invalid Birthday, Do provide one in this format(mm dd)');
		}

		const obj = birthdays[`${month}`][`${day}`];
		if (obj === undefined) {
			return message.channel.send('No one has a birthday on ' + months[month - 1] + ' ' + day + '!');
		}

		const richembed = new Discord.RichEmbed()
			.setTitle(`Here's everyone with a birthday on ${months[month - 1]} ${day}${ordinal(day)}`);
		for (const key in obj) {
			const birthday = new Date(obj[key], month, day);
			const age_dt = new Date(Date.now() - birthday.getTime());
			console.log(birthday + ' ' + age_dt);
			const age = Math.abs(age_dt.getUTCFullYear() - 1970);
			richembed.addField(`${key} - ${obj[key]}`, `${age} years old`, true);
		}
		message.channel.send(richembed);
	},
};
