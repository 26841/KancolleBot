module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message, args) {
		var start = Date.now();
		message.channel.send('Poi!').then(function(ping){
			var stop = Date.now();
			ping.edit(`Poing! ${stop - start}ms`);
		});
	},
};
