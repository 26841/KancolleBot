const { ships } = require('@kancolle/data');

module.exports = {
	name: 'bio-npm',
	description: 'Reworked bio command using @kancolle/data npm',
	cooldown: 5,
	execute(message, args) {
		ships.find(e => e.api_name === args).api_id;
	},
};
