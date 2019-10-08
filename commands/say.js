module.exports = {
	name: 'say',
	description: 'Ask Poi to say something!',
	cooldown: 5,
	execute(message, args) {
    let text = args.join(" ");
    message.delete();
    message.channel.send(text);
	},
};
