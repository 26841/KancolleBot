const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'Embed Test 2.',
	execute(message) {
		message.channel.send({ embed: {
			color: 3447003,
			title: 'This is an embed',
			url: 'http://google.com',
			description: 'This is a test embed to showcase what they look like and what they can do.',
			fields: [{
				name: 'Fields',
				value: 'They can have different fields with small headlines.',
			},
			{
				name: 'Masked links',
				value: 'You can put [masked links](http://google.com) inside of rich embeds.',
			},
			{
				name: 'Markdown',
				value: 'You can put all the *usual* **__Markdown__** inside of them.',
			},
			],
			timestamp: new Date(),
			footer: {
				text: '© Example',
			},
		},
		});
	} };
