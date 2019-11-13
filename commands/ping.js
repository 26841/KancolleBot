module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		const start = Date.now();
		message.channel.send('Poing!').then(function(ping) {
			const stop = Date.now();
			ping.edit(`Poing! ${stop - start}ms`);
		});
	},
};
