module.exports = {
	name: 'args-join',
	description: 'Join arguments test',
	cooldown: 5,
	execute(message, args) {
		if (!args.length) {
			return message.reply('You need to provide arguments!');
		}
		message.channel.send(args.join(' '));
	},
};
