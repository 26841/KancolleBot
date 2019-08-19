module.exports = {
	name: 'nsfw-test',
	description: 'Test for checking nsfw',
	execute(message) {
		console.log('NSFW test');
		if (message.channel.nsfw) {
			console.log('NSFW test 2');
			message.channel.send('Test');
		}
	},
};
