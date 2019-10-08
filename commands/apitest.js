const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	execute(message) {
		console.log(`${wiki.ship['mutsuki']}`);
	},
};
