const patt = /(^|[\s]+)[pP]+[oO]+[iI]+([-~!?.*_\s]+|$)/i;
const poi = ['Poi!', '!ioP', 'POI!', 'Pooooiiiii!', 'POOOOIIIII!', 'ぽい!', 'ぽーい!'];

module.exports = {
	name: 'say',
	description: 'Ask Poi to say something!',
	cooldown: 5,
	execute(message, args) {
		const text = args.join(' ');
		message.delete();
		if (String(text).match(patt)) {
			message.channel.send(poi[Math.floor(Math.random() * poi.length)]);
		}
		else {
			message.channel.send(text);
		}
	},
};
