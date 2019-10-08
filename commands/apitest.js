const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	execute(message) {
		let test = wiki.ship["Fubuki"];
		message.channel.send(`${test}`);
	},
};
