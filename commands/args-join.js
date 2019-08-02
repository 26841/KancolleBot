module.exports = {
	name: 'args-join',
	description: 'Join arguments test',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(args.join(' '));
	},
};
