const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	execute(message) {
		let test = wiki.ship['Mutsuki']
		message.channel.send(test);
	},
};
