const { ships } = require('@kancolle/data');

module.exports = {
	name: 'bio-npm',
	description: 'Reworked bio command using @kancolle/data npm',
	cooldown: 5,
	execute(message, args) {
		console.log(args);
		const test = ships.ship[args];
		console.log(test);
		message.channel.send(test._japanese_name);
	},
};
