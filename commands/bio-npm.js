const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'bio-npm',
	description: 'Reworked bio command using @kancolle/data npm',
	cooldown: 5,
	execute(message, args) {
		const name = args.join(' ')
		console.log(name);
		const test = wiki.ship[name];
		console.log(test);
		message.channel.send(`${test._japanese_name}`);
	},
};
