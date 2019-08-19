module.exports = {
	name: 'nsfw-test',
	description: 'Test for checking nsfw',
	execute(message) {
		console.log('NSFW test');
		if (message.channel.nsfw) {
			message.channel.send('Test');
		}
	},
};
