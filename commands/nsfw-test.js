module.exports = {
	name: 'nsfw-test',
	description: 'Test for checking nsfw',
	execute(message) {
		if (message.channel.nsfw) {
			message.channel.send('Test');
		}
	},
};
