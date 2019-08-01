const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'Embed Test 2.',
	execute(message) {
		message.channel.send('This is an embed', {
			embed: {
				thumbnail: {
					url: 'attachment://file.jpg',
				},
			},
			files: [{
				attachment: 'entire/path/to/file.jpg',
				name: 'file.jpg',
			}],
		})
			.then(console.log)
			.catch(console.error);
	} };
