const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'Embed Test 2.',
	execute(message) {
		message.channel.send('This is an embed', {
			files: [{
				attachment: 'https://i.imgur.com/wSTFkRM.png',
				name: 'file.jpg',
			}],
		})
			.then(console.log)
			.catch(console.error);
	} };
