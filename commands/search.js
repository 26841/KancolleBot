module.exports = {
	name: 'search',
	description: 'Lists all the searchable information groups',
	execute(message) {
		message.channel.send({
			embed: {
				color: 0x0099ff,
				title: 'Information Groups',
				description: 'Here\'s a list of all the searchable kanmusu info groups!',
				fields: [
					{
						name: '.bio',
						value: 'Info about a kanmusu\'s biography',
					},
					{
						name: '.remodel (not yet implemented)',
						value: 'Info about a kanmusu\'s remodelling',
					},
					{
						name: '.stats (not yet implemented)',
						value: 'Info about a kanmusu\'s stats',
					},
					{
						name: '.factory (not yet implemented)',
						value: 'Info about a kanmusu\'s scrap and modernization stats',
					},
				],
			},
		});
	},
};
