const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	execute(message) {
		const test = wiki.ship['Fubuki'];
		console.log(test);
		message.channel.send(test._japanese_name);
	},
};
