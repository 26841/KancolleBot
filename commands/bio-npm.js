const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	cooldown: 5,
	execute(message, args) {
		console.log(args.join(' '));
		const test = wiki.ship[args.join(' ')];
		console.log(test);
		message.channel.send(test._japanese_name);
	},
};
