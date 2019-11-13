module.exports = {
	name: 'credits',
	description: 'Credits to all the people who helped with the development of this bot',
	cooldown: 5,
	execute(message) {
		message.channel.send({ embed: {
			color: 0x0099ff,
			title: 'Credits',
			fields: [
				{
					name: 'Creator',
					value: 'smol Kaga Protection Squad',
				},
				{
					name: 'Code Collaborators/Helpers',
					value: 'XhacKX\ngk\ncedi4155476',
				},
				{
					name: 'Testers',
					value: 'Ariathan\n. 𓁿 .\nericthedomos (002)\nLady Great Skull Zero\nNachash\nTsubakura',
				},
			],
			footer: {
				text: 'Thank you, poi!',
			},
		} });
	} };
