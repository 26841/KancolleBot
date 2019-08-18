const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'music',
	description: 'Play music',
	execute(message) {
		if (!message.guild) return;
  		// Only try to join the sender's voice channel if they are in one themselves
  		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
  		} else {
			message.reply('You need to join a voice channel first!');
  		}
	}
};
