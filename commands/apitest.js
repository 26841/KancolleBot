const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	execute(message) {
		message.channel.send(`${wiki.ship['mutsuki']}`);
	},
};
