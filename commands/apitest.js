const { wiki } = require('@kancolle/data');

module.exports = {
	name: 'apitest',
	description: 'Test Kancolle api',
	execute(message) {
<<<<<<< HEAD
		let test = wiki.ship['Mutsuki']
		message.channel.send(test);
=======
		console.log(`${wiki.ship['mutsuki']}`);
>>>>>>> 53a26a4b0b7089199c2dd56f78cdd0c0ccdd2ee2
	},
};
